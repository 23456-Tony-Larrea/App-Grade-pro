import React from 'react';
import { Button } from 'primereact/button';

interface ButtonModalProps {
    label: string;
    onOpen: () => void;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ label, onOpen }) => {
    return (
        <div>
            <Button 
                label={label} 
                icon="pi pi-plus" 
                onClick={onOpen} 
                className="p-button-success"
            />
        </div>
    );
};

export default ButtonModal;