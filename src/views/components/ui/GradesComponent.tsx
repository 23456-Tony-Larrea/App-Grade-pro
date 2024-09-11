import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PrimeIcons } from "primereact/api";
import "../../../public/assets/ButtonExcel.css";
import SidebarComponent from "../../components/Sidebar";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

const initialStudents = [
  {
    id: 1,
    name: "Ana García",
    course: "A",
    subject: "Matemáticas",
    grades: [85, 90, 88, 92],
  },
  {
    id: 2,
    name: "Carlos López",
    course: "B",
    subject: "Historia",
    grades: [78, 82, 0, 0],
  },
  {
    id: 3,
    name: "Elena Martínez",
    course: "C",
    subject: "Ciencias",
    grades: [92, 95, 91, 89],
  },
  {
    id: 4,
    name: "David Rodríguez",
    course: "A",
    subject: "Literatura",
    grades: [88, 85, 89, 0],
  },
  {
    id: 5,
    name: "Sofía Hernández",
    course: "B",
    subject: "Matemáticas",
    grades: [95, 93, 97, 94],
  },
];

const courses = ["Todos", "A", "B", "C"];
const subjects = ["Todos", "Matemáticas", "Historia", "Ciencias", "Literatura"];

interface GradeComponentProps {
  title: string;
  icon: string;
}

export default function GradeComponent({ title, icon }: GradeComponentProps) {
  const [students, setStudents] = useState(initialStudents);
  const [courseFilters, setCourseFilters] = useState<string[]>(["Todos"]);
  const [subjectFilters, setSubjectFilters] = useState<string[]>(["Todos"]);
  const [nameFilter, setNameFilter] = useState("");
  const popupRef = useRef(null);

  const filteredStudents = students.filter(
    (student) =>
      (courseFilters.includes("Todos") ||
        courseFilters.includes(student.course)) &&
      (subjectFilters.includes("Todos") ||
        subjectFilters.includes(student.subject)) &&
      (nameFilter === "" ||
        student.name.toLowerCase().includes(nameFilter.toLowerCase()))
  );

  const updateGrade = (
    studentId: number,
    gradeIndex: number,
    value: number
  ) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              grades: student.grades.map((grade, index) =>
                index === gradeIndex
                  ? Math.max(0, Math.min(100, grade + value))
                  : grade
              ),
            }
          : student
      )
    );
  };

  const addGradeColumn = () => {
    setStudents(
      students.map((student) => ({
        ...student,
        grades: [...student.grades, 0],
      }))
    );
  };

  const removeGradeColumn = () => {
    if (students[0].grades.length > 3) {
      setStudents(
        students.map((student) => ({
          ...student,
          grades: student.grades.slice(0, -1),
        }))
      );
    }
  };

  const gradeColumns = students[0]?.grades.length || 0;

  const exportToExcel = () => {
    // Lógica para exportar a Excel
    console.log("Exportar a Excel");
  };

  const importFromExcel = () => {
    // Lógica para importar desde Excel
    console.log("Importar desde Excel");
  };

  const confirmRemove = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: "¿Estás seguro de que deseas eliminar esta columna?",
      icon: "pi pi-exclamation-triangle",
      accept: removeGradeColumn,
      reject: () => {},
    });
  };

  const confirmAdd = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: "¿Estás seguro de que deseas agregar esta columna?",
      icon: "pi pi-exclamation-triangle",
      accept: addGradeColumn,
      reject: () => {},
    });
  };

  return (
    <div className="p-4">
      <SidebarComponent />

      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        <i className={icon} style={{ marginRight: "0.5rem" }}></i>
        {title}
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "1rem",
        }}
        className="md:grid-cols-3"
      >
        <div>
          <label
            htmlFor="courseSelect"
            style={{ fontSize: "1.125rem", fontWeight: "600" }}
          >
            Cursos
          </label>
          <Dropdown
            value={courseFilters}
            options={courses.map((course) => ({
              label: course,
              value: course,
            }))}
            onChange={(e) => setCourseFilters(e.value)}
            placeholder="Seleccionar cursos"
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label
            htmlFor="subjectSelect"
            style={{ fontSize: "1.125rem", fontWeight: "600" }}
          >
            Materias
          </label>
          <Dropdown
            value={subjectFilters}
            options={subjects.map((subject) => ({
              label: subject,
              value: subject,
            }))}
            onChange={(e) => setSubjectFilters(e.value)}
            placeholder="Seleccionar materias"
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label htmlFor="nameFilter" className="text-lg font-semibold">
            Buscar por nombre
          </label>
          <InputText
            id="nameFilter"
            type="text"
            placeholder="Nombre del estudiante"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div
        className="mb-4 flex justify-end space-x-2"
        style={{ textAlign: "right" }}
      >
        <Button
          icon={PrimeIcons.ARROW_CIRCLE_UP}
          label="Importar Excel"
          onClick={importFromExcel}
          className="p-button-outlined p-button-black"
        />
        <Button
          icon={PrimeIcons.FILE_EXCEL}
          label="Exportar Excel"
          onClick={exportToExcel}
          className="p-button-outlined p-button-black"
        />
      </div>

      <div className="mb-4 flex justify-end space-x-2">
        <Button
          icon={PrimeIcons.PLUS_CIRCLE}
          onClick={confirmAdd}
          className="p-button-outlined"
        />
        <Button
          icon={PrimeIcons.MINUS_CIRCLE}
          onClick={confirmRemove}
          className="p-button-outlined"
          disabled={gradeColumns <= 3}
        />
      </div>

      <div className="overflow-x-auto">
        <DataTable value={filteredStudents}>
          <Column field="name" header="Nombre" />
          <Column field="course" header="Curso" />
          <Column field="subject" header="Materia" />
          {[...Array(gradeColumns)].map((_, index) => (
            <Column
              key={index}
              header={`Calificación ${index + 1}`}
              body={(rowData) => (
                <div className="flex items-center space-x-2">
                  <span>{rowData.grades[index]}</span>
                  <div className="flex flex-col">
                    <Button
                      icon={PrimeIcons.CHEVRON_UP}
                      className="p-button-text p-button-sm"
                      onClick={() => updateGrade(rowData.id, index, 1)}
                      disabled={rowData.grades[index] === 100}
                    />
                    <Button
                      icon={PrimeIcons.CHEVRON_DOWN}
                      className="p-button-text p-button-sm"
                      onClick={() => updateGrade(rowData.id, index, -1)}
                      disabled={rowData.grades[index] === 0}
                    />
                  </div>
                </div>
              )}
            />
          ))}
        </DataTable>
        <ConfirmPopup ref={popupRef} />
      </div>
    </div>
  );
}
