import { useEffect, useRef, useState } from "react";
import GenericTable from "../../components/ui/Table";
import CustomTitle from "../../components/ui/Titles";
import SidebarComponent from "../../components/Sidebar";
import { User } from "../../../models/User";
import { Toast } from "primereact/toast";
import { ChangeStateBoolAction, GetUsersFalseAction } from "../../../actions/users/users-actions";
import { ConfirmDialog } from 'primereact/confirmdialog';

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

const UserInactivateTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const fetchUsers = async () => {
    try {
      const usersData = await GetUsersFalseAction();
      setUsers(usersData);
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los usuarios",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const customActions = [
    {
      label: "Activar",
      icon: "pi pi-check",
      command: (user: User) => {
        setSelectedUser(user);
        setConfirmVisible(true);
      },
    },
  ];

  const confirmActivation = async () => {
    if (selectedUser) {
      await ChangeStateBoolAction(selectedUser.id!).then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Exito",
          detail: "El usuario ha sido activado",
          life: 3000,
        });
        fetchUsers();
      });
    }
    setConfirmVisible(false);
  };

  return (
    <div>
      <SidebarComponent />
      <Toast ref={toast} />
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message="¿Está seguro de que desea activar este usuario?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={confirmActivation}
        reject={() => setConfirmVisible(false)}
      />
      <CustomTitle title="Gestion de usuarios inactivos" />
      <GenericTable<User>
        data={users}
        columns={columns}
        idField="id"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        customActions={customActions}
      />
    </div>
  );
};

export default UserInactivateTable;