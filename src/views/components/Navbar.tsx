import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { OverlayPanel } from 'primereact/overlaypanel';

function Navbar() {
  const [unreadNotifications] = useState(3);
  const profileMenu = useRef<Menu>(null);
  const notificationsPanel = useRef<OverlayPanel>(null);

  const profileItems = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        // Handle profile click
      }
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => {
        // Handle settings click
      }
    },
    { separator: true },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-power-off',
      command: () => {
        // Handle logout click
      }
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Nueva calificación registrada',
      message: 'Se ha registrado una nueva calificación en Matemáticas',
      time: '5 min',
      unread: true
    },
    {
      id: 2,
      title: 'Actualización de asistencia',
      message: 'Se actualizó el registro de asistencia del día',
      time: '10 min',
      unread: true
    },
    {
      id: 3,
      title: 'Nuevo rol asignado',
      message: 'Se te ha asignado el rol de Editor',
      time: '15 min',
      unread: true
    }
  ];

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre de la aplicación */}
          <div className="flex items-center space-x-3">
            <i className="pi pi-book text-2xl"></i>
            <span className="font-bold text-xl">Sistema Escolar</span>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <div className="relative">
              <Button
                icon="pi pi-bell"
                severity="secondary"
                text
                rounded
                className="p-button-text-white"
                onClick={(e) => notificationsPanel.current?.toggle(e)}
                badge={unreadNotifications.toString()}
                badgeClassName="bg-red-500"
              />
              
              <OverlayPanel 
                ref={notificationsPanel}
                className="w-80"
                breakpoints={{'960px': '75vw', '640px': '90vw'}}
              >
                <div className="p-3">
                  <h3 className="font-bold text-lg mb-3">Notificaciones</h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.unread ? 'bg-blue-50' : 'bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    label="Ver todas"
                    text
                    className="w-full mt-3"
                  />
                </div>
              </OverlayPanel>
            </div>

            {/* Perfil */}
            <div className="relative">
              <Button
                className="p-button-text-white"
                icon="pi pi-user"
                label="John Doe"
                text
                onClick={(e) => profileMenu.current?.toggle(e)}
              />
              <Menu
                model={profileItems}
                popup
                ref={profileMenu}
                className="w-48"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;