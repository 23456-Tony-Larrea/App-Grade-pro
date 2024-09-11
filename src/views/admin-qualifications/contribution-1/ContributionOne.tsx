import { PrimeIcons } from "primereact/api";
import GradeComponent from "../../components/ui/GradesComponent";
import SidebarComponent from "../../components/Sidebar";

export default function GradeOne() {
  return (
    <div>
      <SidebarComponent />
      <GradeComponent title="Aporte 1" icon={PrimeIcons.BOOK} />;
    </div>
  );
}
