import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";
import SidebarComponent from "../../components/Sidebar";
import AddRoleDialog from "./AddRoleDialog";
import { Role } from "../../../models/Role";
import {
  getAllRoles,
  getRolePermissionById,
  updateRole,
  updateRoleAndPermissionById,
} from "../../../actions/role-permissions/role-permissions-actions";
import { Toast } from "primereact/toast";

const options = [
  { label: "Activado", value: true },
  { label: "Desactivado", value: false },
];

export default function RolePermission() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [newRoleName, setNewRoleName] = useState("");
  const toast = useRef<Toast>(null);

  const fetchRolePermissions = async (roleId: number) => {
    try {
      const roleWithPermissions = await getRolePermissionById(roleId);
      return (
        roleWithPermissions.map((rp) => ({
          id: rp.permission!.id,
          name: rp.permission!.name,
          state: rp.state, // Asegúrate de que rp tenga el campo state
        })) ?? []
      );
    } catch (error) {
      console.error(`Error fetching permissions for role ${roleId}:`, error);
      return [];
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesData = await getAllRoles();

      // Obtener los permisos para cada rol
      const rolesWithPermissions = await Promise.all(
        rolesData.map(async (role: Role) => {
          const permissions = await fetchRolePermissions(role.id!);
          return { ...role, permission: permissions };
        })
      );

      setRoles(rolesWithPermissions);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handlePermissionToggle = async (
    roleId: number,
    permissionId: number
  ) => {
    try {
      const role = roles.find((role) => role.id === roleId);
      const permission = role?.permission?.find(
        (permission) => permission.id === permissionId
      );
      const newState = !permission?.state;

      await updateRoleAndPermissionById(roleId, permissionId, newState).then(
        (e) => {
          setRoles(
            roles.map((role) => {
              if (role.id === roleId) {
                return {
                  ...role,
                  permission: role.permission!.map((permission) =>
                    permission.id === permissionId
                      ? { ...permission, state: newState }
                      : permission
                  ),
                };
              }
              return role;
            })
          );
          toast.current?.show({
            severity: "success",
            summary: "Exito",
            detail: e.message,
          });
        }
      );
    } catch (error) {
      console.error("Failed to update permission state:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Fallo al actualizar el permiso",
      });
    }
  };

  const handleAddRole = (roleName: string) => {
    const newRole: Role = {
      id: roles.length + 1,
      name: roleName,
      permission: [], // Inicialmente vacío, se puede llenar después
    };
    setRoles([...roles, newRole]);
  };

  const handleEditRoleName = (roleId: number) => {
    const role = roles.find((role) => role.id === roleId);
    if (role) {
      setEditingRoleId(roleId);
      setNewRoleName(role.name!);
    }
  };

  const handleSaveRoleName = async () => {
    if (editingRoleId !== null) {
      try {
        const updatedRole = await updateRole(editingRoleId, {
          name: newRoleName,
        });
        setRoles(
          roles.map((role) =>
            role.id === editingRoleId
              ? { ...role, name: updatedRole.name }
              : role
          )
        );
        setEditingRoleId(null);
        fetchRoles();
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
  };

  const permissionTemplate = (role: Role) => {
    return (
      <div className="space-y-4">
        {editingRoleId === role.id ? (
          <div className="flex items-center mb-4">
            <InputText
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <Button
              label="Guardar"
              icon="pi pi-check"
              className="p-button-success ml-2"
              onClick={handleSaveRoleName}
            />
          </div>
        ) : (
          <div className="mt-4 mb-4">
            <Button
              label="Editar Nombre"
              icon="pi pi-pencil"
              className="p-button-warning"
              onClick={() => handleEditRoleName(role.id!)}
            />
          </div>
        )}
        <hr />
        {(role.permission ?? []).map((permission) => {
          return (
            <div
              key={permission.id}
              className="flex items-center justify-between"
            >
              <span className="text-lg">{permission.name}</span>
              <SelectButton
                value={permission.state}
                options={options}
                onChange={() =>
                  handlePermissionToggle(role.id!, permission.id!)
                }
                className={`w-36 ${permission.state ? "bg-green-500" : ""}`}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Toast ref={toast} />
      <SidebarComponent />
      <Button
        label="Agregar Roles"
        icon="pi pi-plus"
        className="p-button-success p-button-rounded mb-4"
        onClick={() => setIsModalVisible(true)}
      />
      <Card title="Administrador de Roles y Permisos" className="mb-4">
        <Accordion multiple>
          {roles.map((role) => (
            <AccordionTab
              key={role.id}
              header={
                <div className="flex items-center">
                  <i className={`${PrimeIcons.USER_EDIT} mr-2`} />
                  <span className="font-bold">{role.name}</span>
                </div>
              }
            >
              {permissionTemplate(role)}
            </AccordionTab>
          ))}
        </Accordion>
      </Card>

      <AddRoleDialog
        visible={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        onAddRole={handleAddRole}
      />
    </div>
  );
}
