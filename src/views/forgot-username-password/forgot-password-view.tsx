import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [identity, setIdentity] = useState('');
  const [dialog, setDialog] = useState(true);
  const navigate = useNavigate();

  const sendEmail = () => {
    console.log('Email enviado:', identity);
  };

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
            </Card>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ForgotPassword;