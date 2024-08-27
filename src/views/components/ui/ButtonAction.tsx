import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

interface ButtonActionProps {
    label: string;
    route: string;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ label, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    return (
        <div>
            <Button 
                label={label} 
                icon="pi pi-plus" 
                onClick={handleClick} 
                className="p-button-success"
            />
        </div>
    );
};

export default ButtonAction;