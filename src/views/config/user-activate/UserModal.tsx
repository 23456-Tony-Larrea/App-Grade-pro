import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

interface User {
  id?: number;
  name: string;
  email: string;
  active: boolean;
  role: string;
}

interface UserModalProps {
  visible: boolean;
  onHide: () => void;
  onSave: (user: User) => void;
  user?: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ visible, onHide, onSave, user }) => {
  const [newUser, setNewUser] = useState<User>({ name: '', email: '', active: false, role: '' });
  const roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' }
  ];

  useEffect(() => {
    if (user) {
      setNewUser(user);
    } else {
      setNewUser({ name: '', email: '', active: false, role: '' });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSwitchChange = (e: { value: boolean }) => {
    setNewUser({ ...newUser, active: e.value });
  };

  const handleRoleChange = (e: { value: string }) => {
    setNewUser({ ...newUser, role: e.value });
  };

  const handleSave = () => {
    onSave(newUser);
    setNewUser({ name: '', email: '', active: false, role: '' });
    onHide();
  };

  return (
    <Dialog header="Agregar Usuario" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nombre</label>
          <InputText id="name" name="name" value={newUser.name} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" name="email" value={newUser.email} onChange={handleInputChange} />
        </div>
        <div className="p-field">
          <label htmlFor="active">Activo</label>
          <InputSwitch id="active" checked={newUser.active} onChange={handleSwitchChange} />
        </div>
        <div className="p-field">
          <label htmlFor="role">Rol</label>
          <Dropdown id="role" value={newUser.role} options={roles} onChange={handleRoleChange} placeholder="Selecciona un rol" />
        </div>
      </div>
      <div className="p-dialog-footer">
        <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-text" />
        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} autoFocus />
      </div>
    </Dialog>
  );
};

export default UserModal;