import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RoleAction } from "../../../actions/role-permissions/role-permissions";
import { Toast } from "primereact/toast";
import { Role } from "../../../models/Role";

interface AddRoleDialogProps {
  visible: boolean;
  onHide: () => void;
  onAddRole: (roleName: string) => void;
}

export default function AddRoleDialog({
  visible,
  onHide,
  onAddRole,
}: AddRoleDialogProps) {
  const [newRoleName, setNewRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleAddRole = async () => {
    const nameRoleData: Role = { name: newRoleName };

    setLoading(true);
    try {
      const newRole = await RoleAction(nameRoleData);
      onAddRole(newRole.name!);
      setNewRoleName("");
      onHide();
      toast.current?.show({
        severity: "success",
        summary: "Rol",
        detail: newRole.message,
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding role:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo agregar el rol",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Agregar Nuevo Rol"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="roleName">Nombre del Rol</label>
            <InputText
              id="roleName"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
          </div>
          <Button
            label="Agregar"
            icon="pi pi-plus"
            onClick={handleAddRole}
            className="p-button-success"
            loading={loading}
          />
        </div>
      </Dialog>
    </>
  );
}
