import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import GenericTable from './../../components/ui/Table';
import CustomTitle from '../../components/ui/Titles';
import SidebarComponent from '../../components/Sidebar';
import { Subject } from '../../../models/Subject';
import ButtonModal from '../../components/ui/ButtonModal';
import CustomModal from '../../components/ui/CustomModal';


const SubjectData: Subject[] = [
  { id: 1, name: 'Quimica', state: true },
  { id: 2, name: 'fisica', state: false },
  { id: 3, name: 'Cultura fisica', state: true },
];

const columns: { field: keyof Subject, header: string }[] = [
  { field: 'name', header: 'Nombre' },
];

const SubjectTable = () => {
  const [Subject, setSubject] = useState(SubjectData);
  const [visible, setVisible] = useState(false);
  const [SubjectIdToDelete, setSubjectIdToDelete] = useState<number | null>(null);
  const toast = useRef<Toast>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [textValue, setTextValue] = useState('');
  
  const inputs = [
    { type: 'text', label: 'Input Text', value: textValue, onChange: setTextValue } as const,
  ];

  const handleEdit = (Subject: Subject) => {
    setModalVisible(true);
    setTextValue(Subject.name);
  };

  const handleDelete = (SubjectId: any) => {
    setSubjectIdToDelete(SubjectId);
    setVisible(true);
  };

  const accept = () => {
    if (SubjectIdToDelete !== null) {
      setSubject(Subject.filter(Subject => Subject.id !== SubjectIdToDelete));
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
      <CustomTitle title="Gestion de Materias" />
      <ButtonModal label="Agregar Materia"  onOpen={openModal} />
      <GenericTable<Subject>
        data={Subject}
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

export default SubjectTable;