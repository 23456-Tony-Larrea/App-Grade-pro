import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

const ForgotUsername: React.FC = () => {
  const [identity, setIdentity] = useState('');
  const [dialog, setDialog] = useState(true);
  const navigate = useNavigate();

  const sendEmail = () => {
    // Lógica para enviar el correo
    console.log('Email enviado:', identity);
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
</Card>
      </Dialog>
    </div>
  );
};

export default ForgotUsername;