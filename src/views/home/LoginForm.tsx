import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { WavesIcon } from "../../WavesIcon";
import { login, LoginUserParams } from "../../actions/login";
import { useState } from "react";
import Loader from "../components/Loader";

export default function Component() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const loginData: LoginUserParams = { username, password };
    setLoading(true);
    try {
      const user = await login(loginData);
      console.log("Login successful", user);
      setLoading(false);
    } catch (error) {
      console.error("Login failed", error);
      setLoading(true);
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
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Usuario</label>
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
