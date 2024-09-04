import { PrimeIcons } from "primereact/api";
import GradeComponent from "../../components/ui/GradesComponent";
import SidebarComponent from "../../components/Sidebar";


export default function Exam() {

  return (
    <div>
    <SidebarComponent />
    <GradeComponent title="Examen final" icon={PrimeIcons.BOOK} />;
    </div>
  );
}