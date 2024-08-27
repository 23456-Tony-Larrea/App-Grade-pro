import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import ButtonModal from '../../components/ui/ButtonAction';
import GenericTable from './../../components/ui/Table';
import CustomTitle from '../../components/ui/Titles';
import SidebarComponent from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../models/User';


const usersData: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', active: false },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', active: true },
];

const columns: { field: keyof User, header: string }[] = [
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
];

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(usersData);
  const [visible, setVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const toast = useRef<Toast>(null);

  const handleEdit = (user: User) => {
    navigate(`/edit-user/${user.id}`);
  };

  const handleDelete = (userId: any) => {
    setUserIdToDelete(userId);
    setVisible(true);
  };

  const accept = () => {
    if (userIdToDelete !== null) {
      setUsers(users.filter(user => user.id !== userIdToDelete));
      toast.current?.show({ severity: 'info', summary: 'Confirmar', detail: 'Usuario eliminado', life: 3000 });
    }
    setVisible(false);
  };

  const reject = () => {
    toast.current?.show({ severity: 'warn', summary: 'Cancelado', detail: 'Acción cancelada', life: 3000 });
    setVisible(false);
  };

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Usuarios activos" />
      <ButtonModal label="Agregar usuarios" route='/new-users' />
      <GenericTable<User>
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idField="id"
        activeField="active"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Seguro que quieres eliminar este usuario?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
        acceptLabel='Si'
        rejectLabel='No'
        style={{ width: '50vw' }}
        breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
      />
    </div>
  );
};

export default UserTable;