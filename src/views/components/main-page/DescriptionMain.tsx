// MainContent.tsx
import { PrimeIcons } from "primereact/api";
import { Button } from "primereact/button";
import styles from '../../../public/assets/mainPage.module.css';

export default function DescriptionMain() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.grid} ${styles['grid-cols-custom']}`}>
            <div className={styles.flexCol}>
              <div style={{ gap: '0.5rem' }}>
                <h1 className={styles.heading}>
                  Plataforma Integral de Gestión Educativa
                </h1>
                <p className={`${styles.paragraph} ${styles['text-muted-foreground']}`}>
                  La plataforma integral que facilita la gestión educativa. Administra roles y permisos, sube calificaciones, ingresa estudiantes y organiza cursos de manera eficiente.
                </p>
              </div>
              <div className={`${styles.flexCol} ${styles.flexRow}`}>
                <Button
                  label="Empezar"
                  className="p-button-primary"
                />
                <Button
                  label="Saber más"
                  className="p-button-outlined"
                />
              </div>
            </div>
            <img
              src="../src/public/assets/GettyImages-1645160129.2e16d0ba.fill-1200x630.jpg"
              width="550"
              height="550"
              alt="Hero"
              className={styles.img}
            />
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles['bg-muted']}`}>
        <div className={styles.container}>
          <div className={`${styles.grid} ${styles['grid-cols-3']}`}>
            <div className={`${styles.flexCol} ${styles.textCenter}`}>
              <i className={PrimeIcons.USERS} style={{ fontSize: '48px', color: 'var(--primary-color)' }} />
              <div style={{ gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Gestión de Roles</h3>
                <p style={{ maxWidth: '300px', color: 'var(--text-muted-foreground)' }}>
                  Administra roles y permisos de manera eficiente para asegurar un entorno educativo seguro y organizado.
                </p>
              </div>
            </div>
            <div className={`${styles.flexCol} ${styles.textCenter}`}>
              <i className={PrimeIcons.UPLOAD} style={{ fontSize: '48px', color: 'var(--primary-color)' }} />
              <div style={{ gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Subida de Calificaciones</h3>
                <p style={{ maxWidth: '300px', color: 'var(--text-muted-foreground)' }}>
                  Facilita la subida y gestión de calificaciones para mantener a los estudiantes y padres informados.
                </p>
              </div>
            </div>
            <div className={`${styles.flexCol} ${styles.textCenter}`}>
              <i className={PrimeIcons.BOOKMARK} style={{ fontSize: '48px', color: 'var(--primary-color)' }} />
              <div style={{ gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Organización de Cursos</h3>
                <p style={{ maxWidth: '300px', color: 'var(--text-muted-foreground)' }}>
                  Organiza y gestiona cursos de manera efectiva para proporcionar una experiencia educativa de calidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.grid} ${styles['grid-cols-2']}`}>
            <div style={{ gap: '1rem' }}>
              <div style={{ display: 'inline-block', borderRadius: '0.5rem', backgroundColor: 'var(--muted)', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Nuestros Servicios</div>
              <h2 className={styles.heading}>
                Soluciones Personalizadas para tu Institución
              </h2>
              <p className={`${styles.paragraph} ${styles['text-muted-foreground']}`}>
                Nuestro equipo de expertos está dedicado a proporcionar soluciones personalizadas que aborden las necesidades y desafíos únicos de tu institución educativa.
              </p>
            </div>
            <div className={styles.grid}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <i className={PrimeIcons.CALENDAR} style={{ fontSize: '32px', color: 'var(--primary-color)' }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Gestión de Calendarios</h3>
                  <p style={{ color: 'var(--text-muted-foreground)' }}>
                    Organiza y gestiona eventos académicos y administrativos con facilidad.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <i className={PrimeIcons.CHART_BAR} style={{ fontSize: '32px', color: 'var(--primary-color)' }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Análisis de Datos</h3>
                  <p style={{ color: 'var(--text-muted-foreground)' }}>
                    Utiliza herramientas avanzadas para analizar el rendimiento académico y administrativo.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <i className={PrimeIcons.ENVELOPE} style={{ fontSize: '32px', color: 'var(--primary-color)' }} />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Comunicación Efectiva</h3>
                  <p style={{ color: 'var(--text-muted-foreground)' }}>
                    Facilita la comunicación entre estudiantes, profesores y padres de familia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}