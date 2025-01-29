import { useState } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import RolesAndPermissions from '../home/roleAndPermission';
import Navbar from './Navbar';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string>('');

  const items: MenuItem[] = [
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Usuarios Activos',
          icon: 'pi pi-user',
          command: () => setActiveComponent('usuarios-activos')
        },
        {
          label: 'Usuarios Inactivos',
          icon: 'pi pi-user-minus',
          command: () => setActiveComponent('usuarios-inactivos')
        },
        {
          label: 'Roles y Permisos',
          icon: 'pi pi-shield',
          command: () => setActiveComponent('roles-permisos')
        }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Registro de Usuario',
          icon: 'pi pi-user-plus',
          command: () => setActiveComponent('registro-usuario')
        },
        {
          label: 'Gestión de Usuarios',
          icon: 'pi pi-user-edit',
          command: () => setActiveComponent('gestion-usuarios')
        }
      ]
    },
    {
      label: 'Asistencia',
      icon: 'pi pi-calendar',
      items: [
        {
          label: 'Registro de Asistencia',
          icon: 'pi pi-check-square',
          command: () => setActiveComponent('registro-asistencia')
        },
        {
          label: 'Reportes de Asistencia',
          icon: 'pi pi-chart-bar',
          command: () => setActiveComponent('reportes-asistencia')
        },
        {
          label: 'Justificaciones',
          icon: 'pi pi-file',
          command: () => setActiveComponent('justificaciones')
        }
      ]
    },
    {
      label: 'Calificaciones',
      icon: 'pi pi-star',
      items: [
        {
          label: 'Subir Calificaciones',
          icon: 'pi pi-upload',
          command: () => setActiveComponent('subir-calificaciones')
        },
        {
          label: 'Ver Calificaciones',
          icon: 'pi pi-list',
          command: () => setActiveComponent('ver-calificaciones')
        },
        {
          label: 'Reportes Académicos',
          icon: 'pi pi-chart-line',
          command: () => setActiveComponent('reportes-academicos')
        }
      ]
    },
    {
      label: 'Reportes',
      icon: 'pi pi-file-pdf',
      items: [
        {
          label: 'Reportes Generales',
          icon: 'pi pi-chart-pie',
          command: () => setActiveComponent('reportes-generales')
        },
        {
          label: 'Estadísticas',
          icon: 'pi pi-chart-bar',
          command: () => setActiveComponent('estadisticas')
        }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeComponent) {
      case 'roles-permisos':
        return <RolesAndPermissions />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl text-gray-600">
              Seleccione una opción del menú
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <div 
          className={`hidden md:block bg-white shadow-md min-h-[calc(100vh-4rem)] transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-80'
          }`}
        >
          <div className="p-4">
            <Button
              icon={sidebarCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mb-4 w-full"
              text
              severity="secondary"
            />
            <div className={sidebarCollapsed ? 'hidden' : 'block'}>
              <PanelMenu model={items} className="w-full" />
            </div>
            {sidebarCollapsed && (
              <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                  <Button
                    key={index}
                    icon={item.icon}
                    tooltip={item.label}
                    tooltipOptions={{ position: 'right' }}
                    className="p-button-text"
                    onClick={() => setSidebarCollapsed(false)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Sidebar 
          visible={sidebarVisible} 
          onHide={() => setSidebarVisible(false)}
          className="md:hidden"
        >
          <h1 className="text-xl font-bold text-gray-800 mb-4">Sistema Escolar</h1>
          <PanelMenu model={items} className="w-full" />
        </Sidebar>

        <div className={`flex-1 p-4 transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-0'
        }`}>
          <Button
            icon="pi pi-bars"
            onClick={() => setSidebarVisible(true)}
            className="md:hidden mb-4"
            rounded
            text
          />
          
          <div className="bg-white rounded-lg shadow-md p-4 min-h-[calc(100vh-6rem)]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;