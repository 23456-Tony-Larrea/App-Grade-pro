import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { WavesIcon } from "../../WavesIcon";
import { login, LoginUserParams } from "../../actions/login-actions";
import { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Component() {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    const loginData: LoginUserParams = { identity, password };
    setLoading(true);
    setErrorMessage(null);
    try {
      await login(loginData);
      setLoading(false);
      toast.current?.show({
        severity: "success",
        summary: "Bienvenido",
        detail: "Inicio de sesión exitoso",
        life: 3000,
      });
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Card
        style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--primary-color-text)",
          borderRadius: "var(--border-radius)",
          padding: "3rem",
          marginRight: "2rem",
        }}
      >
        <div>
          <h1 style={{ color: "var(--primary-color-text)" }}>
            Bienvenido a la plataforma
          </h1>
          <p>Inicia sesión para acceder a tu cuenta.</p>
        </div>
        <div>
          <div />
          <div>
            <div>
              <WavesIcon />
            </div>
          </div>
        </div>
      </Card>
      <Card
        style={{
          backgroundColor: "#FFFFFF",
          color: "#000000",
          borderRadius: "var(--border-radius)",
          padding: "3rem",
        }}
      >
        <div>
          <h2 style={{ color: "#000000" }}>Inicio de Sesión</h2>
          <div className="p-field" style={{ marginBottom: "20px" }}>
            <span className="p-float-label">
              <InputText
                id="identity"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
              />
              <label htmlFor="identity">Cédula</label>
            </span>
          </div>
          <div className="p-field" style={{ marginBottom: "20px" }}>
            <span className="p-float-label">
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Contraseña</label>
            </span>
          </div>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Link
              to="/modal-username-password"
              style={{
                color: "var(--primary-color)",
                textDecoration: "underline",
              }}
            >
              ¿Olvidaste tu contraseña y/o usuario ?
            </Link>
          </div>
          {errorMessage && (
            <Message
              severity="error"
              text={errorMessage}
              style={{ marginBottom: "20px" }}
            />
          )}
          <Toast ref={toast} />
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <Loader />
            </div>
          ) : (
            <Button
              label="Iniciar Sesión"
              icon="pi pi-check"
              onClick={handleLogin}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
