import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar, CalendarDateTemplateEvent } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import { locale, addLocale } from 'primereact/api';
import SidebarComponent from '../../components/Sidebar';

type Asistencia = 'Presente' | 'Ausente' | 'Justificado' | 'No justificado';

interface Estudiante {
  id: number;
  nombre: string;
  asistencia: { [fecha: string]: string };
  curso: string;
  materia: string;
}

const estadosAsistencia: Asistencia[] = ['Presente', 'Ausente', 'Justificado', 'No justificado'];
const cursos = ['Curso 1', 'Curso 2', 'Curso 3'];
const materias = ['Matemáticas', 'Historia', 'Ciencias'];

const estudiantes: Estudiante[] = [
  { id: 1, nombre: 'Juan Pérez', asistencia: {}, curso: 'Curso 1', materia: 'Matemáticas' },
  { id: 2, nombre: 'María García', asistencia: {}, curso: 'Curso 2', materia: 'Historia' },
  { id: 3, nombre: 'Carlos Rodríguez', asistencia: {}, curso: 'Curso 1', materia: 'Ciencias' },
];

export default function AsistenciaEstudiantes() {
  const [filtroAsistencia, setFiltroAsistencia] = useState<Asistencia | 'Todos'>('Todos');
  const [filtroCurso, setFiltroCurso] = useState<string | 'Todos'>('Todos');
  const [filtroMateria, setFiltroMateria] = useState<string | 'Todos'>('Todos');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [asistenciaSeleccionada, setAsistenciaSeleccionada] = useState<Asistencia | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [calendarioVisible, setCalendarioVisible] = useState<{ [id: number]: boolean }>({});

  const marcarAsistencia = (estudiante: Estudiante, fecha: string, estado: Asistencia) => {
    estudiante.asistencia[fecha] = estado;
    setEstudianteSeleccionado({ ...estudiante });
    setAsistenciaSeleccionada(estado);
  };

  const filtrarEstudiantes = () => {
    return estudiantes.filter(estudiante => {
      const filtroAsistenciaAplica = filtroAsistencia === 'Todos' || Object.values(estudiante.asistencia).includes(filtroAsistencia);
      const filtroCursoAplica = filtroCurso === 'Todos' || estudiante.curso === filtroCurso;
      const filtroMateriaAplica = filtroMateria === 'Todos' || estudiante.materia === filtroMateria;
      return filtroAsistenciaAplica && filtroCursoAplica && filtroMateriaAplica;
    });
  };

  const getDateStyle = (date: Date, asistencia: { [fecha: string]: string }) => {
    const fechaStr = date.toISOString().split('T')[0];
    const estado = asistencia[fechaStr];
    switch (estado) {
      case 'Presente':
        return { backgroundColor: 'green', color: 'white' };
      case 'Ausente':
        return { backgroundColor: 'orange', color: 'white' };
      case 'Justificado':
        return { backgroundColor: 'yellow', color: 'black' };
      case 'No justificado':
        return { backgroundColor: 'red', color: 'white' };
      default:
        return {};
    }
  };

  const dateTemplate = (event: CalendarDateTemplateEvent, asistencia: { [fecha: string]: string }) => {
    const date = new Date(event.year, event.month, event.day);
    const style = getDateStyle(date, asistencia);
    return (
      <div style={style} className="p-2">
        {event.day}
      </div>
    );
  };

  const calcularTotales = (asistencia: { [fecha: string]: string }) => {
    const totalDias = Object.keys(asistencia).length;
    const totalPresente = Object.values(asistencia).filter(estado => estado === 'Presente').length;
    const totalAusente = Object.values(asistencia).filter(estado => estado === 'Ausente').length;
    const totalJustificado = Object.values(asistencia).filter(estado => estado === 'Justificado').length;
    const totalNoJustificado = Object.values(asistencia).filter(estado => estado === 'No justificado').length;

    return {
      totalDias,
      totalPresente,
      totalAusente,
      totalJustificado,
      totalNoJustificado,
      porcentajePresente: totalDias ? (totalPresente / totalDias) * 100 : 0,
      porcentajeAusente: totalDias ? (totalAusente / totalDias) * 100 : 0,
      porcentajeJustificado: totalDias ? (totalJustificado / totalDias) * 100 : 0,
      porcentajeNoJustificado: totalDias ? (totalNoJustificado / totalDias) * 100 : 0,
    };
  };

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });

  locale('es');

  return (
    <div className="container mx-auto p-4">
            <SidebarComponent />

      <h1 className="text-2xl font-bold mb-4">Asistencia de Estudiantes</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
  <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
    <label>Filtrar por Asistencia:</label>
    <Dropdown
      value={filtroAsistencia}
      options={['Todos', ...estadosAsistencia]}
      onChange={(e) => setFiltroAsistencia(e.value)}
      placeholder="Estado"
      className="w-full"
    />
  </div>
  <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
    <label>Filtrar por Curso:</label>
    <Dropdown
      value={filtroCurso}
      options={['Todos', ...cursos]}
      onChange={(e) => setFiltroCurso(e.value)}
      placeholder="Curso"
      className="w-full"
    />
  </div>
  <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
    <label>Filtrar por Materia:</label>
    <Dropdown
      value={filtroMateria}
      options={['Todos', ...materias]}
      onChange={(e) => setFiltroMateria(e.value)}
      placeholder="Materia"
      className="w-full"
    />
  </div>
</div>

      <DataTable value={filtrarEstudiantes()}>
        <Column field="nombre" header="Nombre" body={(rowData: Estudiante) => (
          <Button
            label={rowData.nombre}
            icon={PrimeIcons.USER}
            className="p-button-link"
            onClick={() => {
              setEstudianteSeleccionado(rowData);
              setDialogVisible(true);
            }}
          />
        )} />
        <Column field="asistencia" header="Visalizar asistencias" body={(rowData: Estudiante) => (
          <>
            <Button
              icon={PrimeIcons.EYE}
              className="p-button-link"
              onClick={() => setCalendarioVisible(prev => ({ ...prev, [rowData.id]: !prev[rowData.id] }))}
            />
            {calendarioVisible[rowData.id] && (
              <Calendar value={null} inline dateTemplate={(event) => dateTemplate(event, rowData.asistencia)} />
            )}
          </>
        )} />
      </DataTable>

      {estudianteSeleccionado && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Resumen de Asistencia de {estudianteSeleccionado.nombre}</h2>
          <div className="grid grid-cols-2 gap-4">
            {(() => {
              const totales = calcularTotales(estudianteSeleccionado.asistencia);
              return (
                <>
                  <div>Total de Días: {totales.totalDias}</div>
                  <div>Total de Presente: {totales.totalPresente} ({totales.porcentajePresente.toFixed(2)}%)</div>
                  <div>Total de Ausente: {totales.totalAusente} ({totales.porcentajeAusente.toFixed(2)}%)</div>
                  <div>Total de Justificado: {totales.totalJustificado} ({totales.porcentajeJustificado.toFixed(2)}%)</div>
                  <div>Total de No Justificado: {totales.totalNoJustificado} ({totales.porcentajeNoJustificado.toFixed(2)}%)</div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <Dialog
        header={`Marcar Asistencia - ${estudianteSeleccionado?.nombre}`}
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
      >
        <Calendar
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.value as Date)}
          placeholder="Seleccionar fecha"
          className="w-full"
          inline
        />
        <Dropdown
          value={asistenciaSeleccionada}
          options={estadosAsistencia}
          onChange={(e) => setAsistenciaSeleccionada(e.value)}
          placeholder="Seleccionar estado"
          className="w-full mt-4"
        />
        <Button
          label="Guardar"
          icon={PrimeIcons.CHECK}
          onClick={() => {
            if (estudianteSeleccionado && fechaSeleccionada && asistenciaSeleccionada) {
              const fechaStr = fechaSeleccionada.toISOString().split('T')[0];
              marcarAsistencia(estudianteSeleccionado, fechaStr, asistenciaSeleccionada);
              setDialogVisible(false);
            }
          }}
          className="mt-4"
        />
      </Dialog>
    </div>
  );
}
