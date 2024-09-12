import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { ForgotUsernameAction, ForgotUsernameParams } from '../../actions/auth/forgot-username-actions';
import axios from 'axios';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

const ForgotUsername: React.FC = () => {
  const [identity, setIdentity] = useState('');
  const [dialog, setDialog] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toast = useRef<Toast>(null);


  const navigate = useNavigate();

  const sendEmail = async () => {
    const forgotPass: ForgotUsernameParams = { identity};
    try{
      await ForgotUsernameAction(forgotPass).then((e) => {
        toast.current?.show({ severity: 'success', summary: 'Correo enviado', detail:e.message, life: 3000 });
      });
    }catch(error){
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const cancel = () => {
    setDialog(false);
    navigate('/modal-username-password');
  };

  return (
    <div>
      <Dialog header="Olvidó su usuario" visible={dialog} onHide={cancel} style={{ width: '50vw' }} modal closeOnEscape={false}>
      <Card title={<><i className="pi pi-user" style={{ marginRight: '0.5rem' }}></i>Olvidó el nombre de su usuario</>} subTitle="">
  <div className="p-fluid">
    <div className="p-field">
      <span className="p-float-label">
        <InputText id="identity" value={identity} onChange={(e) => setIdentity(e.target.value)} />
        <label htmlFor="identity">Ingresa tu cédula</label>
      </span>
    </div>
    <div className="p-field">
      <Button label="Enviar" icon="pi pi-check" onClick={sendEmail} />
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={cancel} style={{ marginLeft: '1rem', color: '#F44336' }} />
    </div>
  </div>
  {errorMessage && (
            <Message severity="error" text={errorMessage} style={{ marginBottom: "20px" }} />
          )}
</Card>
<Toast ref={toast} />
      </Dialog>
    </div>
  );
};

export default ForgotUsername;