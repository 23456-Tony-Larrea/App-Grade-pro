import { PrimeIcons } from "primereact/api";
import { Menubar } from 'primereact/menubar';
import styles from '../../../public/assets/mainPage.module.css';

export default function NavMain() {
  const items = [
    {
      label: 'Iniciar',
      icon: PrimeIcons.SIGN_IN,
      command: () => { /* Acción al hacer clic en Iniciar */ }
    }
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