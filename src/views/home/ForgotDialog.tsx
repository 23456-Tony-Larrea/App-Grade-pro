import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import imageFP from '../../public/assets/forgot-pass.png';
import imageFU from '../../public/assets/forgot-user.png';

const ForgotDialog: React.FC = () => {
  const [dialog, setDialog] = useState(true);
  const navigate = useNavigate();

  const forgotPassword = () => {
    navigate('/forgot-password');
  };

  const forgotUsername = () => {
    navigate('/forgot-username');
  };
  const handleClose = () => {
    setDialog(false);
    navigate('/login');
  };
  return (
    <div>
      <Dialog visible={dialog} onHide={handleClose} style={{ width: '50vw' }} modal closeOnEscape={false}>
        <Card title="¿Olvidaste algo?" subTitle="">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 50%', textAlign: 'center', marginBottom: '1rem' }}>
              <Avatar image={imageFP} size="xlarge" shape="circle" />
              <Button label="Olvidé la contraseña de usuario" style={{ backgroundColor: 'black', borderColor: 'black', marginTop: '1rem' }} onClick={forgotPassword} />
            </div>
            <div style={{ flex: '1 1 50%', textAlign: 'center', marginBottom: '1rem' }}>
              <Avatar image={imageFU} size="xlarge" shape="circle" />
              <Button label="Olvidé mi nombre de usuario" style={{ backgroundColor: 'black', borderColor: 'black', marginTop: '1rem' }} onClick={forgotUsername} />
            </div>
          </div>
        </Card>
      </Dialog>
    </div>
  );
};

export default ForgotDialog;