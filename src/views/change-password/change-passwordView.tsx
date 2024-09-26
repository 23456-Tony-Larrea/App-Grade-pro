import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { ChangePasswordAction } from '../../actions/auth/change-pass-actions';
import { ChangePass } from '../../models/ChangePass';
import axios from 'axios';

const ChangePasswordView = () => {
    const { id } = useParams<{ id: string }>(); 
    const userId = parseInt(id!, 10); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const messages = useRef<Messages>(null); 
    const navigate = useNavigate(); 

    const handleBack = () => {
        navigate('/login'); 
    };

    const submitForm = async () => {
        const changePassData: ChangePass = {
            id: userId,
            newPassword: password,
            confirmPassword: confirmPassword
        };
        try {
            await ChangePasswordAction(userId, changePassData).then(data => {
                messages.current?.show({ severity: 'success', summary: 'Éxito', detail: data.message });
            }
            )
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Error:', err.response?.data);
                messages.current?.show({ severity: 'error', summary: 'Error', detail: err.response?.data?.message || 'Error al cambiar la contraseña' });
            } else {
                console.error('Unexpected error:', err);
                messages.current?.show({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error inesperado' });
            }
        }
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center">
            <Card title="CAMBIO DE CONTRASEÑA" className="p-shadow-5">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button icon="pi pi-arrow-left" className="p-button-text" onClick={handleBack} />
                </div>
                <Messages ref={messages} />
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