import { PrimeIcons } from "primereact/api";
import GradeComponent from "../../components/ui/GradesComponent";
import SidebarComponent from "../../components/Sidebar";

export default function GradeTwo() {
  return (
    <div>
      <SidebarComponent />
      <GradeComponent title="Aporte 2" icon={PrimeIcons.BOOK} />;
    </div>
  );
}
