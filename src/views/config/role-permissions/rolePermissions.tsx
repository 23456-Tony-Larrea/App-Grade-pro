import { useState } from "react"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Card } from "primereact/card"
import { SelectButton } from "primereact/selectbutton"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { PrimeIcons } from "primereact/api"
import SidebarComponent from "../../components/Sidebar"
import AddRoleDialog from "./AddRoleDialog"

interface Permission {
  id: number
  name: string
  enabled: boolean
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

// Datos de ejemplo
const rolesAndPermissions: Role[] = [
  {
    id: 1,
    name: "Administrador",
    permissions: [
      { id: 1, name: "Crear usuarios", enabled: true },
      { id: 2, name: "Editar usuarios", enabled: true },
      { id: 3, name: "Eliminar usuarios", enabled: true },
      { id: 4, name: "Ver reportes", enabled: true },
    ],
  },
  {
    id: 2,
    name: "Editor",
    permissions: [
      { id: 1, name: "Crear usuarios", enabled: false },
      { id: 2, name: "Editar usuarios", enabled: true },
      { id: 3, name: "Eliminar usuarios", enabled: false },
      { id: 4, name: "Ver reportes", enabled: true },
    ],
  },
  {
    id: 3,
    name: "Visualizador",
    permissions: [
      { id: 1, name: "Crear usuarios", enabled: false },
      { id: 2, name: "Editar usuarios", enabled: false },
      { id: 3, name: "Eliminar usuarios", enabled: false },
      { id: 4, name: "Ver reportes", enabled: true },
    ],
  },
]

const allPermissions: Permission[] = [
  { id: 1, name: "Crear usuarios", enabled: true },
  { id: 2, name: "Editar usuarios", enabled: true },
  { id: 3, name: "Eliminar usuarios", enabled: true },
  { id: 4, name: "Ver reportes", enabled: true },
]

const options = [
  { label: 'Activado', value: true },
  { label: 'Desactivado', value: false }
]

export default function Component() {
  const [roles, setRoles] = useState<Role[]>(rolesAndPermissions)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null)
  const [newRoleName, setNewRoleName] = useState("")

  const handlePermissionToggle = (roleId: number, permissionId: number) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: role.permissions.map(permission => 
            permission.id === permissionId ? { ...permission, enabled: !permission.enabled } : permission
          )
        }
      }
      return role
    }))
  }

  const handleAddRole = (roleName: string) => {
    const newRole: Role = {
      id: roles.length + 1,
      name: roleName,
      permissions: allPermissions.map(permission => ({ ...permission }))
    }
    setRoles([...roles, newRole])
  }

  const handleEditRoleName = (roleId: number) => {
    const role = roles.find(role => role.id === roleId)
    if (role) {
      setEditingRoleId(roleId)
      setNewRoleName(role.name)
    }
  }

  const handleSaveRoleName = () => {
    setRoles(roles.map(role => 
      role.id === editingRoleId ? { ...role, name: newRoleName } : role
    ))
    setEditingRoleId(null)
    setNewRoleName("")
  }

  const permissionTemplate = (role: Role) => {
    return (
      <div className="space-y-4">
        {editingRoleId === role.id ? (
          <div className="flex items-center mb-4">
            <InputText value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-success ml-2" onClick={handleSaveRoleName} />
          </div>
        ) : (
          <div className="mt-4 mb-4">
            <Button label="Editar Nombre" icon="pi pi-pencil" className="p-button-warning" onClick={() => handleEditRoleName(role.id)} />
          </div>
        )}
        <hr />
        {role.permissions.map(permission => (
          <div key={permission.id} className="flex items-center justify-between">
            <span className="text-lg">{permission.name}</span>
            <SelectButton
              value={permission.enabled}
              options={options}
              onChange={() => handlePermissionToggle(role.id, permission.id)}
              className={`w-36 ${permission.enabled ? 'bg-green-500' : ''}`}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <SidebarComponent />
      <Button label="Agregar Roles" icon="pi pi-plus" className="p-button-success p-button-rounded mb-4" onClick={() => setIsModalVisible(true)} />
      <Card title="Administrador de Roles y Permisos" className="mb-4">
        <Accordion multiple>
          {roles.map(role => (
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
  )
}