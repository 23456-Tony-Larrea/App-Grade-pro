import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import GenericTable from './../../components/ui/Table';
import CustomTitle from '../../components/ui/Titles';
import SidebarComponent from '../../components/Sidebar';
import { Course } from '../../../models/Course';
import ButtonModal from '../../components/ui/ButtonModal';
import CustomModal from '../../components/ui/CustomModal';


const courseData: Course[] = [
  { id: 1, name: 'A', state: true },
  { id: 2, name: 'B', state: false },
  { id: 3, name: 'C', state: true },
];

const columns: { field: keyof Course, header: string }[] = [
  { field: 'name', header: 'Nombre' },
];

const CourseTable = () => {
  const [course, setcourse] = useState(courseData);
  const [visible, setVisible] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState<number | null>(null);
  const toast = useRef<Toast>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [textValue, setTextValue] = useState('');
  
  const inputs = [
    { type: 'text', label: 'Input Text', value: textValue, onChange: setTextValue } as const,
  ];

  const handleEdit = (course: Course) => {
    setModalVisible(true);
    setTextValue(course.name);
  };

  const handleDelete = (courseId: any) => {
    setCourseIdToDelete(courseId);
    setVisible(true);
  };

  const accept = () => {
    if (courseIdToDelete !== null) {
      setcourse(course.filter(course => course.id !== courseIdToDelete));
      toast.current?.show({ severity: 'info', summary: 'Confirmar', detail: 'Curso eliminado', life: 3000 });
    }
    setVisible(false);
  };

  const reject = () => {
    toast.current?.show({ severity: 'warn', summary: 'Cancelado', detail: 'Acción cancelada', life: 3000 });
    setVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <div>
      <SidebarComponent />
      <CustomTitle title="Gestion de Curso" />
      <ButtonModal label="Agregar Curso"  onOpen={openModal} />
      <GenericTable<Course>
        data={course}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idField="id"
        activeField="state"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Seguro que quieres eliminar este curso?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
        acceptLabel='Si'
        rejectLabel='No'
        style={{ width: '50vw' }}
        breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
      />
       <CustomModal 
                visible={modalVisible} 
                onHide={closeModal} 
                title={modalTitle} 
                setTitle={setModalTitle} 
                header={"title 2"} 
                showSaveButton={true} 
                saveButtonLabel="Guardar" 
                showCloseButton={true}
                inputs={inputs} 
            />
    </div>
  );
};

export default CourseTable;