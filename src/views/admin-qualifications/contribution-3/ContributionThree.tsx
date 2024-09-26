import { PrimeIcons } from "primereact/api";
import GradeComponent from "../../components/ui/GradesComponent";
import SidebarComponent from "../../components/Sidebar";

export default function GradeThree() {
  return (
    <div>
      <SidebarComponent />
      <GradeComponent title="Aporte 3" icon={PrimeIcons.BOOK} />;
    </div>
  );
}
