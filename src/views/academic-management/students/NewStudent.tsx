
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

export default function NewEstudents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    cedula: '',
    primerNombre: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    roles: [],
    cursos: '',
    tutor: []
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e:any, field:any) => {
    setFormData(prev => ({ ...prev, [field]: e.value }));
  };


  const roles = [
    { name: 'Estudiante', code: 'EST' },
    { name: 'Delegado', code: 'DEL' },
    { name: 'Representante', code: 'REP' }
  ];

  const cursos = [
    { name: 'A', code: 'A-001' },
    { name: 'B', code: 'B-001' },
    { name: 'C', code: 'C-001' },
    { name: 'D', code: 'D-001' }
  ];

  const steps = [
    { label: 'Información Básica' },
    { label: 'Ingreso del Alumnado' }
  ];
  const tutores = ['Tutor 1', 'Tutor 2', 'Tutor 3'];


  return (
    <div className="card">
      <Steps model={steps} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
      
      <Card title="Registro de Usuarios" className="mt-4">
        {activeIndex === 0 && (
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="cedula" className="font-bold">Cédula</label>
              <InputText id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="primerNombre" className="font-bold">Primer Nombre</label>
              <InputText id="primerNombre" name="primerNombre" value={formData.primerNombre} onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="segundoNombre" className="font-bold">Segundo Nombre</label>
              <InputText id="segundoNombre" name="segundoNombre" value={formData.segundoNombre} onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="apellidoPaterno" className="font-bold">Apellido Paterno</label>
              <InputText id="apellidoPaterno" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="apellidoMaterno" className="font-bold">Apellido Materno</label>
              <InputText id="apellidoMaterno" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="email" className="font-bold">Correo Electrónico</label>
              <InputText id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>
        )}

        {activeIndex === 1 && (
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="roles" className="font-bold">Roles</label>
              <MultiSelect
                id="roles"
                value={formData.roles}
                options={roles}
                onChange={(e) => handleMultiSelect(e, 'roles')}
                optionLabel="name"
                placeholder="Selecciona roles"
                display="chip"
              />
            </div>
            <div className="field">
              <label htmlFor="cursos" className="font-bold">Cursos</label>
                    <Dropdown
        id="cursos"
        value={formData.cursos}
        options={cursos}
        onChange={(e) => handleInputChange({ target: { name: 'cursos', value: e.value } })}
        optionLabel="name"
        placeholder="Selecciona un curso"
      />
            </div>
            <div className="field">
              <label htmlFor="tutor" className="font-bold">Tutor</label>
              <MultiSelect
                id="tutor"
                value={formData.tutor}
                options={tutores}
                onChange={(e) => handleMultiSelect('tutor', e.value)}
                placeholder="Selecciona tutores"
              />
            </div>
            <div className="flex justify-content-between">
              <Button label="Enviar" icon="pi pi-check" onClick={() => console.log(formData)} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}