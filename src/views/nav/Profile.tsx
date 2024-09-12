import { useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import SidebarComponent from '../components/Sidebar';
import { GetUsersAction } from '../../actions/users/users-actions';

export default function ProfileView() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({
    identity: '',
    name: '',
    firstLastName: '',
    email: ''
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cambio de contraseña solicitado');
  };

  const fetchUsers = async () => {
    try {
      const usersData = await GetUsersAction();
      const userData = usersData[0]; // Asumiendo que solo necesitas el primer usuario
      console.log('User ID:', userData.id);
      setUser({
        identity: userData.identity!,
        name: userData.name!,
        firstLastName: userData.firstLastName!,
        email: userData.email!
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const header = (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Avatar
        image="https://randomuser.me/api/portraits/men/75.jpg"
        size="xlarge"
        shape="circle"
      />
    </div>
  );

  return (
    <>
      <SidebarComponent />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
        <Card title="Perfil de Usuario" header={header} style={{ width: '100%', maxWidth: '640px' }}>
          <div className="p-fluid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <InputText id="email" value={user.email} readOnly style={{ fontWeight: 'bold' }} />
            </div>
            <div>
              <label htmlFor="cedula">Cédula</label>
              <InputText id="cedula" value={user.identity} readOnly style={{ fontWeight: 'bold' }} />
            </div>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <InputText id="nombre" value={user.name} readOnly style={{ fontWeight: 'bold' }} />
            </div>
            <div>
              <label htmlFor="apellido">Apellido</label>
              <InputText id="apellido" value={user.firstLastName} readOnly style={{ fontWeight: 'bold' }} />
            </div>
          </div>
          <Divider />
          <form onSubmit={handlePasswordChange}>
            <div className="p-fluid" style={{ marginBottom: '16px' }}>
              <label htmlFor="new-password">Nueva Contraseña</label>
              <Password
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="p-fluid" style={{ marginBottom: '16px' }}>
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <Password
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <Button label="Cambiar Contraseña" icon="pi pi-check" type="submit" style={{ width: '100%' }} />
          </form>
          <Divider />
        </Card>
      </div>
    </>
  );
}