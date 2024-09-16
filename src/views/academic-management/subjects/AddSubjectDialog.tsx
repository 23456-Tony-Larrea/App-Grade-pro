import { useRef, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Subject } from "../../../models/Subject";
import {
  SubjectsAddAction,
  UpdateSubjectAction,
} from "../../../actions/subject/subject-actions";

interface AddsubjectDialogProps {
  visible: boolean;
  onHide: () => void;
  onAddsubject: () => void;
  subjectToEdit?: Subject | null;
}

export default function AddsubjectDialog({
  visible,
  onHide,
  onAddsubject,
  subjectToEdit,
}: AddsubjectDialogProps) {
  const [newsubjectName, setNewsubjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (subjectToEdit) {
      setNewsubjectName(subjectToEdit.name!);
    } else {
      setNewsubjectName("");
    }
  }, [subjectToEdit]);

  const handleAddSubject = async () => {
    const namesubjectData: Subject = { name: newsubjectName };

    setLoading(true);
    try {
      const newsubject = await SubjectsAddAction(namesubjectData);
      onAddsubject();
      onHide();
      toast.current?.show({
        severity: "success",
        summary: "Materia",
        detail: newsubject.message,
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo agregar la materia",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubject = async () => {
    if (!subjectToEdit) return;

    const updatedsubjectData: Subject = {
      ...subjectToEdit,
      name: newsubjectName,
    };

    setLoading(true);
    try {
      const updatedsubject = await UpdateSubjectAction(updatedsubjectData);
      onAddsubject();
      onHide();
      toast.current?.show({
        severity: "success",
        summary: "Materia",
        detail: updatedsubject.message,
        life: 3000,
      });
    } catch (error) {
      console.error("Error updating subject:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo actualizar la materia",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={subjectToEdit ? "Editar Materia" : "Agregar Nueva Materia"}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="SubjectName">Nombre de la materia</label>
            <InputText
              id="SubjectName"
              value={newsubjectName}
              onChange={(e) => setNewsubjectName(e.target.value)}
            />
          </div>
          <Button
            label={subjectToEdit ? "Actualizar" : "Agregar"}
            icon={subjectToEdit ? "pi pi-pencil" : "pi pi-plus"}
            onClick={subjectToEdit ? handleUpdateSubject : handleAddSubject}
            className="p-button-success"
            loading={loading}
          />
        </div>
      </Dialog>
    </>
  );
}
