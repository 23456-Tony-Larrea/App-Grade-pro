import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import GenericTable from "./../../components/ui/Table";
import CustomTitle from "../../components/ui/Titles";
import SidebarComponent from "../../components/Sidebar";
import { Course } from "../../../models/Course";
import {
  ChangeStateBoolCourseAction,
  GetCoursesAction,
} from "../../../actions/course/Course-actions";
import { Button } from "primereact/button";
import AddCourseDialog from "./AddEditCourseDialog";

const columns: { field: keyof Course; header: string }[] = [
  { field: "name", header: "Nombre" },
];

const CourseTable = () => {
  const [course, setCourse] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const toast = useRef<Toast>(null);

  const fetchCourse = async () => {
    try {
      const CourseData = await GetCoursesAction();
      setCourse(CourseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleEdit = (course: Course) => {
    setCourseToEdit(course);
    setIsModalVisible(true);
  };

  const handleToggleStatus = async (course: Course) => {
    try {
      await ChangeStateBoolCourseAction(course.id!).then(() => {
        fetchCourse();
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

  const handleAddCourse = () => {
    fetchCourse();
  };

  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Curso" />
      <Button
        label="Agregar Curso"
        icon="pi pi-plus"
        className="p-button-success p-button-rounded mb-4"
        onClick={() => {
          setCourseToEdit(null);
          setIsModalVisible(true);
        }}
      />
      <GenericTable<Course>
        data={course}
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
      <AddCourseDialog
        visible={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        onAddCourse={handleAddCourse}
        courseToEdit={courseToEdit}
      />
    </div>
  );
};

export default CourseTable;
