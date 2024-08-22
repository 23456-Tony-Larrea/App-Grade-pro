import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';

interface NavbarProps {
  onMenuButtonClick: () => void;
}

export default function Navbar({ onMenuButtonClick }: NavbarProps) {
  return (
    <Menubar
      start={<Button icon="pi pi-bars" className="p-button-rounded p-button-text lg:hidden" onClick={onMenuButtonClick} />}
      end={
        <div className="flex items-center">
          <InputText placeholder="Buscar..." className="mr-2 p-inputtext-sm bg-sky-600 text-white placeholder-sky-200 border-sky-400" />
          <Button icon="pi pi-search" className="p-button-rounded p-button-text" />
          <Button icon="pi pi-bell" className="p-button-rounded p-button-text mr-2" />
          <Button icon="pi pi-user" className="p-button-rounded p-button-text" />
        </div>
      }
      className="bg-sky-500 text-white"
    />
  );
}