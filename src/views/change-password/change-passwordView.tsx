import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

const ChangePasswordView = () => {
    const { id } = useParams<{ id: string }>();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const submitForm = () => {
        // Lógica para enviar el formulario
        console.log('ID:', id);
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center">
            <Card title="CAMBIO DE CONTRASEÑA" className="p-shadow-5">
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="password">Nueva contraseña</label>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask feedback={false} />
                    </div>
                    <div className="p-field-checkbox">
                        <Checkbox inputId="showPassword" checked={showPassword} onChange={(e) => setShowPassword(e.checked!)} />
                        <label htmlFor="showPassword">Ver contraseña</label>
                    </div>
                    <Button label="Cambiar contraseña" icon="pi pi-check" onClick={submitForm} />
                </div>
            </Card>
        </div>
    );
};

export default ChangePasswordView;