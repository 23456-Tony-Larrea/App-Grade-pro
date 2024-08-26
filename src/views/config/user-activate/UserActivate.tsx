import { useState } from 'react';
import ButtonModal from '../../components/ui/ButtonModal';
import CustomModal from '../../components/ui/CustomModal';
import GenericTable from './../../components/ui/Table';
import CustomTitle from '../../components/ui/Titles';
import SidebarComponent from '../../components/Sidebar';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', active: false },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', active: true },
];

const columns: { field: keyof User, header: string }[] = [
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
];

const handleEdit = (user: User) => {
  console.log('Edit user:', user);
};

const handleDelete = (userId: any) => {
  console.log('Delete user with id:', userId);
};


const UserTable = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [switchValue, setSwitchValue] = useState(false);
    const [multiSelectValue, setMultiSelectValue] = useState([]);
    const multiSelectOptions = [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }];

    const inputs = [
        { type: 'text', label: 'Input Text', value: textValue, onChange: setTextValue } as const,
        { type: 'switch', label: 'Input Switch', value: switchValue, onChange: setSwitchValue } as const,
        { type: 'multiselect', label: 'Multi Select', value: multiSelectValue, onChange: setMultiSelectValue, options: multiSelectOptions } as const,
        { type: 'checkbox', label: 'Checkbox', value: checkboxValue, onChange: setCheckboxValue } as const
    ];



  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  

  return (
    <div>
        <SidebarComponent/>
      <CustomTitle title="Gestion de Usuarios activos"/>
      <ButtonModal label="Agregar usuarios" onOpen={openModal} />
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
      <GenericTable<User>
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idField="id"
        activeField="active"
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      />
    </div>
  );
};

export default UserTable;