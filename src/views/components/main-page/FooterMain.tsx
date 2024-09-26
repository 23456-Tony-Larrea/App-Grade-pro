// Footer.tsx
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";

export default function FooterMain() {
  return (
    <footer
      className="p-d-flex p-flex-column p-ai-center p-p-4"
      style={{ backgroundColor: "#007ad9", color: "white" }}
    >
      <div className="p-d-flex p-jc-between p-ai-center p-w-full p-mb-3">
        <div>
          <h3 className="p-mb-1">GradePro</h3>
          <p className="p-mt-0">Empoderando la Educación en Todas Partes</p>
        </div>
        <div className="p-d-flex">
          <Tooltip target=".social-icon" />
          <Button
            className="p-button-rounded p-button-secondary p-mr-2 social-icon"
            icon="pi pi-facebook"
            tooltip="Facebook"
            tooltipOptions={{ position: "top" }}
          />
          <Button
            className="p-button-rounded p-button-secondary p-mr-2 social-icon"
            icon="pi pi-twitter"
            tooltip="Twitter"
            tooltipOptions={{ position: "top" }}
          />
          <Button
            className="p-button-rounded p-button-secondary p-mr-2 social-icon"
            icon="pi pi-instagram"
            tooltip="Instagram"
            tooltipOptions={{ position: "top" }}
          />
          <Button
            className="p-button-rounded p-button-secondary social-icon"
            icon="pi pi-linkedin"
            tooltip="LinkedIn"
            tooltipOptions={{ position: "top" }}
          />
        </div>
      </div>
      <Divider />
      <div className="p-d-flex p-jc-between p-ai-center p-w-full">
        <p>
          &copy; {new Date().getFullYear()} GradePro. Todos los derechos
          reservados.
        </p>
        <p>
          <Link
            to="#"
            className="p-mr-3"
            style={{ color: "white", textDecoration: "none" }}
          >
            Términos de Servicio
          </Link>
          <Link to="#" style={{ color: "white", textDecoration: "none" }}>
            Política de Privacidad
          </Link>
        </p>
      </div>
    </footer>
  );
}
