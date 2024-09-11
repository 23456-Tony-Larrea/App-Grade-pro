import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import ButtonModal from "../../components/ui/ButtonAction";
import GenericTable from "../../components/ui/Table";
import CustomTitle from "../../components/ui/Titles";
import SidebarComponent from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";

const usersData: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", active: true },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", active: false },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    active: true,
  },
];

const columns: { field: keyof User; header: string }[] = [
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
];

const StudentTable = () => {
  const navigate = useNavigate();
  const [users] = useState(usersData);
  const toast = useRef<Toast>(null);

  const handleEdit = (user: User) => {
    navigate(`/edit-student/${user.id}`, { state: { user } });
  };

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Estudiantes" />
      <ButtonModal label="Agregar estudiantes" route="/new-students" />
      <GenericTable<User>
        data={users}
        columns={columns}
        onEdit={handleEdit}
        idField="id"
        activeField="active"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
      <Toast ref={toast} />
    </div>
  );
};

export default StudentTable;
