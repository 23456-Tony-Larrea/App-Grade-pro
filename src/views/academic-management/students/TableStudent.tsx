import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import ButtonModal from "../../components/ui/ButtonAction";
import GenericTable from "./../../components/ui/Table";
import CustomTitle from "../../components/ui/Titles";
import SidebarComponent from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import { ChangeStateBoolAction, GetUsersAction } from "../../../actions/users/users-actions";

const columns: { field: keyof User; header: string }[] = [
  { field: "identity", header: "Cedula" },
  { field: "name", header: "Primer Nombre" },
  { field: "secondName", header: "Segundo nombre" },
  { field: "firstLastName", header: "Apellido Paterno" },
  { field: "secondLastName", header: "Apellido Materno" },
  { field: "email", header: "Email" },
  { field: "phone", header: "telefono" },
  { field: "gender", header: "Genero" },
];

const StudentsTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const toast = useRef<Toast>(null);
  const fetchUsers = async () => {
    try {
      const usersData = await GetUsersAction();
      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    navigate('/new-students', { state: { user } });
  };

  const handleToggleStatus = async (user: User) => {
    try {
    await ChangeStateBoolAction(user.id!).then(() => {
      fetchUsers();
    })
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo cambiar el estado del usuario",
        life: 3000,
      });
    }
  };

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Estudiantes" />
      <ButtonModal label="Agregar Estudiantes" route="/new-students" />
      <GenericTable<User>
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        idField="id"
        activeField="state"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
      <Toast ref={toast} />
      
    </div>
  );
};

export default StudentsTable;