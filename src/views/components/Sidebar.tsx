import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';
import Navbar from './Navbar'; // Importa el componente Navbar

export default function SidebarComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const items = [
    {
      label: 'Insertar Curso',
      icon: 'pi pi-book',
      command: () => { /* Acción para Insertar Curso */ }
    },
    {
      label: 'Dar Roles',
      icon: 'pi pi-user-plus',
      command: () => { /* Acción para Dar Roles */ }
    },
    {
      label: 'Colocar Curso',
      icon: 'pi pi-file',
      command: () => { /* Acción para Colocar Curso */ }
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => { /* Acción para Configuración */ }
    }
  ];

  return (
    <div className="flex h-screen bg-white">
      <Sidebar visible={sidebarOpen} onHide={() => setSidebarOpen(false)} className="p-sidebar-lg">
        <PanelMenu model={items} className="mt-8" />
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Bienvenido al Sistema de Calificaciones</h1>
        </main>
      </div>
    </div>
  );
}