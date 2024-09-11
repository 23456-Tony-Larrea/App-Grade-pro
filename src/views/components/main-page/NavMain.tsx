import { PrimeIcons } from "primereact/api";
import { Menubar } from "primereact/menubar";
import styles from "../../../public/assets/mainPage.module.css";
import { useNavigate } from "react-router-dom";

export default function NavMain() {
  // Simulación de la navegación con React Router DOM
  const navigate = useNavigate();
  const items = [
    {
      label: "Iniciar",
      icon: PrimeIcons.SIGN_IN,
      command: () => {
        navigate("/login");
      },
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerLink}>
        <i className={`${PrimeIcons.BOOK} ${styles.headerLinkIcon}`} />
        <span className={styles.headerTitle}>GradePro</span>
      </div>
      <Menubar model={items} className={styles.nav} />
    </header>
  );
}
