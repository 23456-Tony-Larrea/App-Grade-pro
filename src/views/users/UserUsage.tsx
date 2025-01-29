import { useState } from 'react';
import CustomTable from '../components/ui/CustomTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserUsage = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active'
    }
  ]);

  const columns = [
    {
      field: 'name',
      header: 'Nombre',
      sortable: true,
      filter: true
    },
    {
      field: 'email',
      header: 'Correo',
      sortable: true,
      filter: true
    },
    {
      field: 'role',
      header: 'Rol',
      sortable: true,
      filter: true
    },
    {
      field: 'status',
      header: 'Estado',
      sortable: true,
      filter: true,
      body: (rowData: User) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          rowData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {rowData.status}
        </span>
      )
    }
  ];

  const handleAdd = async (data: User) => {
    const newUser = {
      ...data,
      id: users.length + 1
    };
    setUsers([...users, newUser]);
  };

  const handleEdit = async (data: User) => {
    setUsers(users.map(user => 
      user.id === data.id ? data : user
    ));
  };

  const handleDelete = async (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleImport = async (data: User[]) => {
    const newUsers = data.map((user, index) => ({
      ...user,
      id: users.length + index + 1
    }));
    setUsers([...users, ...newUsers]);
  };

  return (
    <CustomTable
      title="Gestión de Usuarios"
      columns={columns}
      data={users}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onImport={handleImport}
    />
  );
};

export default UserUsage;