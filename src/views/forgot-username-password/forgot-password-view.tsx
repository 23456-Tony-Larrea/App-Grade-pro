import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { ForgotPassParams, ForgotPasswordAction } from '../../actions/auth/forgot-pass';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [identity, setIdentity] = useState('');
  const [dialog, setDialog] = useState(true);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toast = useRef<Toast>(null);


  const sendEmail = async() => {
    const forgotPass: ForgotPassParams = { identity};
    try{
      await ForgotPasswordAction(forgotPass).then((e) => {
        toast.current?.show({ severity: 'success', summary: 'Correo enviado', detail:e.message, life: 3000 });
      });
    }catch(error){
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  }

  const cancel = () => {
    setDialog(false);
    navigate('/modal-username-password');
  };

  return (
    <Dialog header="Recuperar contraseña" visible={dialog} onHide={cancel} style={{ width: '50vw' }}>
      <div className="p-fluid">
        <div className="p-grid p-justify-center">
          <div className="p-col-12 p-sm-8 p-md-6">
            <Card>
              <div className="p-card-title p-d-flex p-jc-center p-ai-center">
                <i className="pi pi-lock" style={{ marginRight: '0.5rem' }}></i>
                Recuperar contraseña
              </div>
              <div className="p-card-content">
                <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }}>
                  <div className="p-field">
                    <label htmlFor="identity">Ingresa tu cédula</label>
                    <InputText id="identity" value={identity} onChange={(e) => setIdentity(e.target.value)} required />
                  </div>
                  <Button type="submit" label="Enviar" className="p-button-primary" />
                  <Button label="Cancelar" className="p-button-text p-button-danger" onClick={cancel} />
                </form>
              </div>
              {errorMessage && (
            <Message severity="error" text={errorMessage} style={{ marginBottom: "20px" }} />
          )}
          <Toast ref={toast} />
            </Card>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ForgotPassword;