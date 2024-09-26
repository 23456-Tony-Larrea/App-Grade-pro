import { useState } from "react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import SidebarComponent from "../components/Sidebar";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";
import { UpdatePasswordAction } from "../../actions/auth/update-pass-actions";

export default function ProfileView() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [actuallyPassword, setActualPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const authUser = useAuthStore((state) => state.authUser);

  const clearAllInputs = () => {
    setNewPassword("");
    setConfirmPassword("");
    setActualPassword("");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authUser) {
      const updatePassData = {
        id: authUser.id,
        actuallyPassword,
        newPassword,
        confirmPassword,
      };
      try {
        const response = await UpdatePasswordAction(
          authUser.id!,
          updatePassData
        );
        setErrorMessage(null);
        setSuccessMessage(response.message!);
        clearAllInputs();
      } catch (error) {
        setSuccessMessage(null);
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }
  };

  const header = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Avatar
        image="https://randomuser.me/api/portraits/men/75.jpg"
        size="xlarge"
        shape="circle"
      />
    </div>
  );

  return (
    <>
      <SidebarComponent />
      <div
        style={{ display: "flex", justifyContent: "center", padding: "16px" }}
      >
        <Card
          title="Perfil de Usuario"
          header={header}
          style={{ width: "100%", maxWidth: "640px" }}
        >
          <div
            className="p-fluid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <InputText
                id="email"
                value={authUser?.email || ""}
                readOnly
                style={{ fontWeight: "bold" }}
              />
            </div>
            <div>
              <label htmlFor="cedula">Cédula</label>
              <InputText
                id="cedula"
                value={authUser?.identity || ""}
                readOnly
                style={{ fontWeight: "bold" }}
              />
            </div>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <InputText
                id="nombre"
                value={authUser?.name || ""}
                readOnly
                style={{ fontWeight: "bold" }}
              />
            </div>
            <div>
              <label htmlFor="apellido">Apellido</label>
              <InputText
                id="apellido"
                value={authUser?.secondLastName || ""}
                readOnly
                style={{ fontWeight: "bold" }}
              />
            </div>
          </div>
          <Divider />
          {errorMessage && (
            <Message
              severity="error"
              text={errorMessage}
              style={{ marginBottom: "16px" }}
            />
          )}
          {successMessage && (
            <Message
              severity="success"
              text={successMessage}
              style={{ marginBottom: "16px" }}
            />
          )}
          <form onSubmit={handlePasswordChange}>
            <div className="p-fluid" style={{ marginBottom: "16px" }}>
              <label htmlFor="actually-password">Actual Contraseña</label>
              <Password
                id="actually-password"
                value={actuallyPassword}
                onChange={(e) => setActualPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="p-fluid" style={{ marginBottom: "16px" }}>
              <label htmlFor="new-password">Nueva Contraseña</label>
              <Password
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="p-fluid" style={{ marginBottom: "16px" }}>
              <label htmlFor="confirm-password">Confirmar Contraseña</label>
              <Password
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <Button
              label="Cambiar Contraseña"
              icon="pi pi-check"
              type="submit"
              style={{ width: "100%" }}
            />
          </form>
          <Divider />
        </Card>
      </div>
    </>
  );
}
