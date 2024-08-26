import { useState } from "react"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

interface AddRoleDialogProps {
  visible: boolean
  onHide: () => void
  onAddRole: (roleName: string) => void
}

export default function AddRoleDialog({ visible, onHide, onAddRole }: AddRoleDialogProps) {
  const [newRoleName, setNewRoleName] = useState("")

  const handleAddRole = () => {
    onAddRole(newRoleName)
    setNewRoleName("")
    onHide()
  }

  return (
    <Dialog header="Agregar Nuevo Rol" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="roleName">Nombre del Rol</label>
          <InputText id="roleName" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
        </div>
        <Button label="Agregar" icon="pi pi-plus" onClick={handleAddRole} className="p-button-success" />
      </div>
    </Dialog>
  )
}