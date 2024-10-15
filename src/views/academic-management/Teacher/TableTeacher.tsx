import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import ButtonModal from "../../components/ui/ButtonAction";
import GenericTable from "./../../components/ui/Table";
import CustomTitle from "../../components/ui/Titles";
import SidebarComponent from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import {
  ChangeStateBoolAction,
  GetUsersAction,
} from "../../../actions/users/users-actions";
import { Button } from "primereact/button";
import CoursesDialog from "../../components/ui/CoursesDialog";

const TeacherTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const toast = useRef<Toast>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogCourses, setDialogCourses] = useState<string[]>([]);
  const [dialogTitle, setDialogTitle] = useState("");

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
    navigate("/new-teacher", { state: { user } });
  };

  const handleToggleStatus = async (user: User) => {
    try {
      await ChangeStateBoolAction(user.id!).then(() => {
        fetchUsers();
      });
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

  const handleShowCourses = (courses: string, title: string) => {
    setDialogCourses(JSON.parse(courses || "[]"));
    setDialogTitle(title);
    setDialogVisible(true);
  };

  const columns: {
    field: keyof User | string;
    header: string;
    customBody?: (rowData: User) => JSX.Element;
  }[] = [
    { field: "identity", header: "Cedula" },
    { field: "name", header: "Primer Nombre" },
    { field: "secondName", header: "Segundo nombre" },
    { field: "firstLastName", header: "Apellido Paterno" },
    { field: "secondLastName", header: "Apellido Materno" },
    { field: "email", header: "Email" },
    { field: "phone", header: "telefono" },
    { field: "gender", header: "Genero" },
    {
      field: "roleName",
      header: "Rol",
      customBody: (rowData) => <span>{rowData.role?.name || ""}</span>,
    },
    {
      field: "courseTeacher",
      header: "Cursos",
      customBody: (rowData) => (
        <Button
          icon="pi pi-book"
          onClick={() => handleShowCourses(rowData.courseTeacher!, "Cursos")}
          className="p-button-rounded p-button-text"
        />
      ),
    },
    {
      field: "tutorCourses",
      header: "Tutor",
      customBody: (rowData) => (
        <Button
          icon="pi pi-book"
          onClick={() => handleShowCourses(rowData.tutorCourses!, "Tutorías")}
          className="p-button-rounded p-button-text"
        />
      ),
    },
  ];

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Profesores" />
      <ButtonModal label="Agregar Profesores" route="/new-teacher" />
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
      <CoursesDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        courses={dialogCourses}
        title={dialogTitle}
      />
    </div>
  );
};

export default TeacherTable;
