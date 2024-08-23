import { Pie, Line } from 'react-chartjs-2';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Button } from 'primereact/button';

ChartJS.register(ArcElement, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

export default function DashboardCalificaciones() {
  // Datos de ejemplo
  const usuariosData = {
    labels: ['Profesores', 'Estudiantes'],
    datasets: [{
      data: [50, 500],
      backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
      hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']
    }]
  };

  const calificacionesDistribucionData = {
    labels: ['Excelente (9-10)', 'Bueno (7-8)', 'Regular (5-6)', 'Insuficiente (0-4)'],
    datasets: [{
      data: [30, 45, 20, 5],
      backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 99, 132, 0.8)'],
      hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)']
    }]
  };

  const calificacionesTendenciaData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Promedio de calificaciones',
      data: [7.5, 7.8, 8.1, 7.9, 8.3, 8.5],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const alumnosRecientes = [
    { id: 1, nombre: 'Ana García', fecha: '2023-06-15' },
    { id: 2, nombre: 'Carlos Rodríguez', fecha: '2023-06-14' },
    { id: 3, nombre: 'María López', fecha: '2023-06-13' },
    { id: 4, nombre: 'Juan Martínez', fecha: '2023-06-12' },
    { id: 5, nombre: 'Laura Sánchez', fecha: '2023-06-11' },
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Calificaciones</h1>
            <div className="flex flex-wrap gap-4 mb-4">
        <Card title="Total Profesores" style={{ textAlign: 'center', flex: '1 1 30%' }}>
          <Button icon="pi pi-user" className="p-button-rounded p-button-info mb-3" />
          <p className="text-3xl font-bold">50</p>
        </Card>
        <Card title="Total Estudiantes" style={{ textAlign: 'center', flex: '1 1 30%' }}>
          <Button icon="pi pi-users" className="p-button-rounded p-button-success mb-3" />
          <p className="text-3xl font-bold">500</p>
        </Card>
        <Card title="Promedio General" style={{ textAlign: 'center', flex: '1 1 30%' }}>
          <Button icon="pi pi-chart-line" className="p-button-rounded p-button-warning mb-3" />
          <p className="text-3xl font-bold">8.2</p>
        </Card>
      </div>

      {/* Charts en pares (2 en 2) */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Card title="Distribución de Usuarios" style={{ flex: '1 1 45%' }}>
          <div style={{ height: '300px' }}>
            <Pie data={usuariosData} />
          </div>
        </Card>
        <Card title="Distribución de Calificaciones" style={{ flex: '1 1 45%' }}>
          <div style={{ height: '300px' }}>
            <Pie data={calificacionesDistribucionData} />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <Card title="Tendencia de Calificaciones" style={{ flex: '1 1 45%' }}>
          <div style={{ height: '300px' }}>
            <Line data={calificacionesTendenciaData} />
          </div>
        </Card>
        <Card title="Alumnos Recientemente Agregados" style={{ flex: '1 1 45%' }}>
          <DataTable value={alumnosRecientes} paginator rows={5}>
            <Column field="id" header="ID" />
            <Column field="nombre" header="Nombre" />
            <Column field="fecha" header="Fecha de Registro" />
          </DataTable>
        </Card>
      </div>
    </div>
  );
}