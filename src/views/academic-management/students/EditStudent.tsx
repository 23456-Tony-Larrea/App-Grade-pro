import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { User } from '../../../models/User';


const usersData: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', active: false },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', active: true },
];

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const foundUser = usersData.find(u => u.id === parseInt(id!));
    if (foundUser) {
      setUser(foundUser);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => prev ? { ...prev, [name]: value } : null);
  };

  const saveUser = () => {
    console.log('User saved:', user);
    navigate('/user-activate');
  };

  const cancelEdit = () => {
    navigate('/user-activate'); 
  };

  return (
    <div className="p-fluid">
      <h2>Editar Usuario</h2>
      {user && (
        <>
          <div className="field">
            <label htmlFor="name" className="font-bold">Nombre</label>
            <InputText id="name" name="name" value={user.name} onChange={handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="email" className="font-bold">Correo Electrónico</label>
            <InputText id="email" name="email" value={user.email} onChange={handleInputChange} />
          </div>
          <div className="p-field p-grid">
            <div className="p-col">
              <Button label="Guardar" icon="pi pi-check" onClick={saveUser} />
            </div>
            <div className="p-col">
              <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={cancelEdit} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditUser;