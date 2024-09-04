import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Steps } from 'primereact/steps';
import { PrimeIcons } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import SidebarComponent from '../../components/Sidebar';

interface FormTeacherProps {
  teacherData?: any;
  mode: 'insert' | 'edit';
}

export default function FormTeacher({ teacherData, mode }: FormTeacherProps) {
  const [paso, setPaso] = useState(0);
  const [curso, setCurso] = useState(teacherData?.curso || null);
  const [formData, setFormData] = useState({
    nombre: teacherData?.nombre || '',
    segundoNombre: teacherData?.segundoNombre || '',
    apellidoPaterno: teacherData?.apellidoPaterno || '',
    apellidoMaterno: teacherData?.apellidoMaterno || '',
    fechaNacimiento: teacherData?.fechaNacimiento || null,
    edad: teacherData?.edad || '',
    cedula: teacherData?.cedula || '',
    correoElectronico: teacherData?.correoElectronico || '',
    representante: teacherData?.representante || '',
    tutor: teacherData?.tutor || '',
  });

  useEffect(() => {
    if (teacherData) {
      setFormData({
        nombre: teacherData.nombre,
        segundoNombre: teacherData.segundoNombre,
        apellidoPaterno: teacherData.apellidoPaterno,
        apellidoMaterno: teacherData.apellidoMaterno,
        fechaNacimiento: teacherData.fechaNacimiento,
        edad: teacherData.edad,
        cedula: teacherData.cedula,
        correoElectronico: teacherData.correoElectronico,
        representante: teacherData.representante,
        tutor: teacherData.tutor,
      });
      setCurso(teacherData.curso);
    }
  }, [teacherData]);

  const siguientePaso = () => setPaso((prev) => Math.min(prev + 1, 1));
  const pasoAnterior = () => setPaso((prev) => Math.max(prev - 1, 0));

  const cursos = [
    { label: 'Curso 1', value: '1' },
    { label: 'Curso 2', value: '2' },
    { label: 'Curso 3', value: '3' },
    // Agrega más cursos según sea necesario
  ];

  const items = [
    { label: 'Información Básica' },
    { label: 'Información Adicional' }
  ];

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <SidebarComponent />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
        <i className={PrimeIcons.USER} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          {mode === 'insert' ? 'Insertar Profesor' : 'Editar Profesor'}
        </h2>
      </div>
      <Card>
        <Steps model={items} activeIndex={paso} className="mb-8" />

        {paso === 0 ? (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Nombre" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="segundoNombre">Segundo Nombre</label>
                <InputText id="segundoNombre" value={formData.segundoNombre} onChange={handleInputChange} placeholder="Segundo Nombre" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                <InputText id="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleInputChange} placeholder="Apellido Paterno" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="apellidoMaterno">Apellido Materno</label>
                <InputText id="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleInputChange} placeholder="Apellido Materno" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                <Calendar id="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} placeholder="Fecha de Nacimiento" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="edad">Edad</label>
                <InputNumber id="edad" value={formData.edad} onChange={(e) => handleInputChange({ target: { id: 'edad', value: e.value } })} placeholder="Edad" />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="cedula">Cédula</label>
              <InputMask id="cedula" value={formData.cedula} onChange={handleInputChange} mask="999-9999999-9" placeholder="Cédula" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="correoElectronico">Correo Electrónico</label>
              <InputText id="correoElectronico" value={formData.correoElectronico} onChange={handleInputChange} type="email" placeholder="correo@ejemplo.com" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="representante">Representante</label>
              <InputText id="representante" value={formData.representante} onChange={handleInputChange} placeholder="Nombre del Representante" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="tutor">Tutor</label>
              <InputText id="tutor" value={formData.tutor} onChange={handleInputChange} placeholder="Nombre del Tutor" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="curso">Curso</label>
              <Dropdown id="curso" value={curso} options={cursos} onChange={(e) => setCurso(e.value)} placeholder="Seleccione un curso" />
            </div>
          </div>
        )}
      </Card>
      <Card className="flex justify-between">
        {paso > 0 && (
          <Button onClick={pasoAnterior} icon={PrimeIcons.ARROW_LEFT} label="Anterior" className="p-button-outlined" />
        )}
        {paso < 1 ? (
          <Button onClick={siguientePaso} icon={PrimeIcons.ARROW_RIGHT} label="Siguiente" className="ml-auto" />
        ) : (
          <Button icon={PrimeIcons.SAVE} label={mode === 'insert' ? 'Guardar' : 'Actualizar'} className="ml-auto" />
        )}
      </Card>
    </Card>
  );
}