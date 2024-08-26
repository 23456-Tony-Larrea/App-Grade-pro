import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import '../../../public/assets/CustomModal.css'; // Importa el archivo CSS

interface InputConfig {
    type: 'text' | 'switch' | 'multiselect' | 'checkbox';
    label: string;
    value: any;
    onChange: (value: any) => void;
    options?: any[]; // For MultiSelect
}

interface CustomModalProps {
    visible: boolean;
    onHide: () => void;
    title: string;
    setTitle: (title: string) => void;
    header?: string;
    showSaveButton?: boolean;
    saveButtonLabel?: string;
    showCloseButton?: boolean;
    inputs?: InputConfig[];
}

const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onHide,
    title,
    setTitle,
    header = "Edit Title",
    showSaveButton = true,
    saveButtonLabel = "Save",
    showCloseButton = true,
    inputs
}) => {
    return (
        <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={onHide}>
            <div className="p-field">
                <label htmlFor="title">Title</label>
                <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-grid">
                {inputs!.map((input, index) => (
                    <div className="p-field" key={index}>
                        <label>{input.label}</label>
                        {input.type === 'text' && (
                            <InputText value={input.value} onChange={(e) => input.onChange(e.target.value)} />
                        )}
                        {input.type === 'switch' && (
                            <InputSwitch checked={input.value} onChange={(e) => input.onChange(e.value)} />
                        )}
                        {input.type === 'multiselect' && (
                            <MultiSelect value={input.value} options={input.options} onChange={(e) => input.onChange(e.value)} />
                        )}
                        {input.type === 'checkbox' && (
                            <Checkbox checked={input.value} onChange={(e) => input.onChange(e.checked)} />
                        )}
                    </div>
                ))}
            </div>
            {showSaveButton && (
                <Button label={saveButtonLabel} icon="pi pi-check" onClick={onHide} />
            )}
            {showCloseButton && (
                <Button label="Close" icon="pi pi-times" onClick={onHide} className="p-button-secondary" />
            )}
        </Dialog>
    );
};

export default CustomModal;