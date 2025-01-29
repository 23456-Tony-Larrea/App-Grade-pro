import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useRef } from 'react';
import { Permission, Role } from '../../models/RolePermision';

function RolesAndPermissions() {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Administrador', description: 'Control total del sistema' },
    { id: 2, name: 'Editor', description: 'Puede editar contenido' },
    { id: 3, name: 'Usuario', description: 'Acceso básico' },
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 1, name: 'Crear usuarios', description: 'Permite crear nuevos usuarios', enabled: true },
    { id: 2, name: 'Editar usuarios', description: 'Permite modificar usuarios existentes', enabled: true },
    { id: 3, name: 'Eliminar usuarios', description: 'Permite eliminar usuarios', enabled: false },
    { id: 4, name: 'Ver reportes', description: 'Permite ver reportes del sistema', enabled: true },
    { id: 5, name: 'Configuración', description: 'Acceso a la configuración', enabled: false },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const toast = useRef<Toast>(null);

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      const newId = Math.max(...roles.map(r => r.id)) + 1;
      setRoles([...roles, { ...newRole, id: newId }]);
      setDialogVisible(false);
      setNewRole({ name: '', description: '' });
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Rol creado correctamente',
        life: 3000
      });
    }
  };

  const handleDeleteRole = (role: Role) => {
    confirmDialog({
      message: `¿Está seguro que desea eliminar el rol "${role.name}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        setRoles(roles.filter(r => r.id !== role.id));
        setSelectedRole(null);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Rol eliminado correctamente',
          life: 3000
        });
      }
    });
  };

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    setPermissions(permissions.map(p => 
      p.id === permissionId ? { ...p, enabled: checked } : p
    ));
    toast.current?.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Permiso actualizado correctamente',
      life: 3000
    });
  };

  const actionBodyTemplate = (rowData: Role) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          rounded 
          text 
          severity="success"
          onClick={() => setSelectedRole(rowData)}
        />
        <Button 
          icon="pi pi-trash" 
          rounded 
          text 
          severity="danger"
          onClick={() => handleDeleteRole(rowData)}
        />
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Roles y Permisos</h1>
          <Button 
            label="Nuevo Rol" 
            icon="pi pi-plus" 
            severity="success"
            onClick={() => setDialogVisible(true)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lista de Roles */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Roles</h2>
            <DataTable 
              value={roles} 
              selection={selectedRole}
              onSelectionChange={e => setSelectedRole(e.value as Role)}
              selectionMode="single"
              dataKey="id"
              className="mb-4"
            >
              <Column field="name" header="Nombre" sortable />
              <Column field="description" header="Descripción" />
              <Column body={actionBodyTemplate} style={{ width: '100px' }} />
            </DataTable>
          </div>

          {/* Permisos del Rol Seleccionado */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">
              {selectedRole ? `Permisos: ${selectedRole.name}` : 'Seleccione un rol'}
            </h2>
            {selectedRole ? (
              <div className="space-y-4">
                {permissions.map(permission => (
                  <div key={permission.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <h3 className="font-medium">{permission.name}</h3>
                      <p className="text-sm text-gray-600">{permission.description}</p>
                    </div>
                    <InputSwitch 
                      checked={permission.enabled}
                      onChange={e => handlePermissionChange(permission.id, e.value as boolean)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Seleccione un rol para ver y editar sus permisos
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Diálogo para Nuevo Rol */}
      <Dialog 
        visible={dialogVisible} 
        onHide={() => setDialogVisible(false)}
        header="Nuevo Rol"
        modal
        className="p-fluid"
      >
        <div className="space-y-4 p-4">
          <div className="field">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Rol
            </label>
            <InputText
              id="name"
              value={newRole.name}
              onChange={e => setNewRole({ ...newRole, name: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <InputText
              id="description"
              value={newRole.description}
              onChange={e => setNewRole({ ...newRole, description: e.target.value })}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              label="Cancelar" 
              icon="pi pi-times" 
              onClick={() => setDialogVisible(false)} 
              className="p-button-text"
            />
            <Button 
              label="Guardar" 
              icon="pi pi-check" 
              onClick={handleAddRole} 
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default RolesAndPermissions;