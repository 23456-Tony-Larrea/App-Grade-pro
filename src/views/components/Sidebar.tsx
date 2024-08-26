import { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import Navbar from "./Navbar";

export default function SidebarComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const items = [
    {
      label: "Gestión de Asistencia",
      icon: "pi pi-calendar",
      items: [
        {
          label: "Justificados",
          icon: "pi pi-check",
          command: () => {
            /* Acción para Gestionar Asistencia Justificados */
          },
        },
        {
          label: "Faltas",
          icon: "pi pi-times",
          command: () => {
            /* Acción para Gestionar Asistencia Faltas */
          },
        },
        {
          label: "Asistencias",
          icon: "pi pi-user-plus",
          command: () => {
            /* Acción para Gestionar Asistencia Asistencias */
          },
        },
        {
          label: "Asistencias Totales",
          icon: "pi pi-users",
          command: () => {
            /* Acción para Gestionar Asistencia Asistencias */
          },
        },
      ],
    },
    {
      label: "Administrar Calificaciones",
      icon: "pi pi-pencil",
      items: [
        {
          label: "Aporte 1",
          icon: "pi pi-file",
          command: () => {
            /* Acción para Insertar Calificaciones Aporte 1 */
          },
        },
        {
          label: "Aporte 2",
          icon: "pi pi-file",
          command: () => {
            /* Acción para Insertar Calificaciones Aporte 2 */
          },
        },
        {
          label: "Aporte 3",
          icon: "pi pi-file",
          command: () => {
            /* Acción para Insertar Calificaciones Aporte 3 */
          },
        },
        {
          label: "Exámenes",
          icon: "pi pi-file",
          command: () => {
            /* Acción para Insertar Calificaciones Exámenes */
          },
        },
      ],
    },
    {
      label: "Gestión Académica",
      icon: "pi pi-book",
      items: [
        {
          label: "Insertar Materias",
          icon: "pi pi-book",
          command: () => {
            /* Acción para Insertar Curso */
          },
        },
        {
          label: "Insertar Curso",
          icon: "pi pi-book",
          command: () => {
            /* Acción para Insertar Curso */
          },
        },
        {
          label: "Insertar Profesor",
          icon: "pi pi-user",
          command: () => {
            /* Acción para Insertar Profesor */
          },
        },
        {
          label: "Insertar Estudiante",
          icon: "pi pi-users",
          command: () => {
            /* Acción para Insertar Estudiante */
          },
        },
      ],
    },
    {
      label: "Configuración",
      icon: "pi pi-cog",
      items: [
        {
          label: "Insertar Usuarios",
          icon: "pi pi-user",
          command: () => {
            /* Acción para Insertar Usuarios */
          },
        },
        {
          label: "Usuarios Inactivos",
          icon: "pi pi-user-minus",
          command: () => {
            /* Acción para Usuarios Inactivos */
          },
        },
        {
          label: "Roles y Permisos",
          icon: "pi pi-lock",
          command: () => {
            /* Acción para Roles y Permisos */
          },
        },
      ],
    },
  ];

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Sidebar
        visible={sidebarOpen}
        onHide={() => setSidebarOpen(false)}
        className="p-sidebar-sm"
      >
        <PanelMenu model={items} className="mt-8" />
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          onMenuButtonClick={() => setSidebarOpen(true)}
          onToggleDarkMode={handleToggleDarkMode}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
