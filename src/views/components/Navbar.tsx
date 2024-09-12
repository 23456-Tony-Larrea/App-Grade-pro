import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuButtonClick?: () => void;
  onToggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

export default function Navbar({
  onMenuButtonClick,
  onToggleDarkMode,
  isDarkMode,
}: NavbarProps) {
  const navigate = useNavigate();

  return (
    <Menubar
      start={
        <Button
          icon="pi pi-bars"
          className="p-button-rounded p-button-text lg:hidden"
          onClick={onMenuButtonClick}
        />
      }
      end={
        <div className="flex items-center">
          <InputText
            placeholder="Buscar..."
            className={`mr-2 p-inputtext-sm ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-sky-600 text-white placeholder-sky-200 border-sky-400"
            }`}
          />
          <Button
            icon="pi pi-search"
            className="p-button-rounded p-button-text"
          />
          <Button
            icon="pi pi-bell"
            className="p-button-rounded p-button-text mr-2"
          />
          <Button
            icon="pi pi-user"
            className="p-button-rounded p-button-text"
            onClick={() => navigate("/profile")}
          />
          <Button
            icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
            className="p-button-rounded p-button-text"
            onClick={onToggleDarkMode}
          />
        </div>
      }
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-sky-500 text-white"
      }`}
    />
  );
}
