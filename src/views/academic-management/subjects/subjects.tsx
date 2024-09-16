import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import GenericTable from "./../../components/ui/Table";
import CustomTitle from "../../components/ui/Titles";
import SidebarComponent from "../../components/Sidebar";
import { Subject } from "../../../models/Subject";
import {
  ChangeStateBoolSubjectAction,
  GetSubjectsAction
} from "../../../actions/subject/subject-actions";
import { Button } from "primereact/button";
import AddSubjectDialog from "./AddSubjectDialog";

const columns: { field: keyof Subject; header: string }[] = [
  { field: "name", header: "Nombre" },
];

const SubjectTable = () => {
  const [subject, setsubject] = useState<Subject[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subjectToEdit, setsubjectToEdit] = useState<Subject | null>(null);
  const toast = useRef<Toast>(null);

  const fetchsubject = async () => {
    try {
      const subjectData = await GetSubjectsAction();
      setsubject(subjectData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchsubject();
  }, []);

  const handleEdit = (subject: Subject) => {
    setsubjectToEdit(subject);
    setIsModalVisible(true);
  };

  const handleToggleStatus = async (subject: Subject) => {
    try {
      await ChangeStateBoolSubjectAction(subject.id!).then(() => {
        fetchsubject();
      });
    } catch (error) {
      console.log(error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo cambiar el estado del curso",
        life: 3000,
      });
    }
  };

  const handleAddsubject = () => {
    fetchsubject();
  };

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Materias" />
      <Button
        label="Agregar Materia"
        icon="pi pi-plus"
        className="p-button-success p-button-rounded mb-4"
        onClick={() => {
          setsubjectToEdit(null);
          setIsModalVisible(true);
        }}
      />
      <GenericTable<Subject>
        data={subject}
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
      <AddSubjectDialog
        visible={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        onAddsubject={handleAddsubject}
        subjectToEdit={subjectToEdit}
      />
    </div>
  );
};

export default SubjectTable;
