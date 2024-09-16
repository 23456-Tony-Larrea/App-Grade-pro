import { useRef, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Course } from "../../../models/Course";
import {
  CoursesAddAction,
  UpdateCourseAction,
} from "../../../actions/course/Course-actions";

interface AddCourseDialogProps {
  visible: boolean;
  onHide: () => void;
  onAddCourse: () => void;
  courseToEdit?: Course | null;
}

export default function AddCourseDialog({
  visible,
  onHide,
  onAddCourse,
  courseToEdit,
}: AddCourseDialogProps) {
  const [newCourseName, setNewCourseName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (courseToEdit) {
      setNewCourseName(courseToEdit.name);
    } else {
      setNewCourseName("");
    }
  }, [courseToEdit]);

  const handleAddCourse = async () => {
    const nameCourseData: Course = { name: newCourseName };

    setLoading(true);
    try {
      const newCourse = await CoursesAddAction(nameCourseData);
      onAddCourse();
      onHide();
      toast.current?.show({
        severity: "success",
        summary: "Curso",
        detail: newCourse.message,
        life: 3000,
      });
    } catch (error) {
      console.error("Error adding Course:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo agregar el curso",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    if (!courseToEdit) return;

    const updatedCourseData: Course = { ...courseToEdit, name: newCourseName };

    setLoading(true);
    try {
      const updatedCourse = await UpdateCourseAction(updatedCourseData);
      onAddCourse();
      onHide();
      toast.current?.show({
        severity: "success",
        summary: "Curso",
        detail: updatedCourse.message,
        life: 3000,
      });
    } catch (error) {
      console.error("Error updating Course:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo actualizar el curso",
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
        header={courseToEdit ? "Editar Curso" : "Agregar Nuevo curso"}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="CourseName">Nombre del curso</label>
            <InputText
              id="CourseName"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
            />
          </div>
          <Button
            label={courseToEdit ? "Actualizar" : "Agregar"}
            icon={courseToEdit ? "pi pi-pencil" : "pi pi-plus"}
            onClick={courseToEdit ? handleUpdateCourse : handleAddCourse}
            className="p-button-success"
            loading={loading}
          />
        </div>
      </Dialog>
    </>
  );
}
