import { useState } from 'react';
import GenericTable from '../../components/ui/Table';
import CustomTitle from '../../components/ui/Titles';
import SidebarComponent from '../../components/Sidebar';
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

const UserInactivateTable = () => {
  const [users] = useState(usersData);

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de usuarios inactivos" />
      <GenericTable<User>
        data={users}
        columns={columns}
        idField="id"
        activeField="active"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
    </div>
  );
};

export default UserInactivateTable;