import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { Link } from 'react-router-dom';  // Asegúrate de manejar la navegación correctamente
import 'primeicons/primeicons.css';  // Importa los íconos de PrimeIcons

export default function Home() {
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const carouselItems = [
    {
      id: 1,
      content: "EduGest ha revolucionado la forma en que gestiono mis clases. ¡Es una herramienta indispensable!"
    },
    {
      id: 2,
      content: "La plataforma es muy intuitiva y fácil de usar. ¡La recomiendo a todos los profesores!"
    },
    {
      id: 3,
      content: "Gracias a EduGest, puedo dedicar más tiempo a enseñar y menos a la administración."
    }
  ];

  const itemTemplate = (item:any) => {
    return (
      <Card>
        <p className="text-lg font-semibold">
          {item.content}
        </p>
      </Card>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <i className="pi pi-book"></i> {/* Icono de PrimeIcons */}
          <span className="sr-only">EduGest</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Características
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Precios
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="#">
            Contacto
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Gestiona tu clase con facilidad
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Simplifica la administración de cursos, calificaciones y asistencia con nuestra plataforma integral para profesores.
                </p>
              </div>
              <div className="space-x-4">
                <Button label="Comenzar ahora" />
                <Button label="Saber más" className="p-button-outlined" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Características principales
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card title="Gestión de Estudiantes" subTitle="">
                <i className="pi pi-users" style={{ fontSize: '2em', marginBottom: '0.5em' }}></i>
                <p>
                  Administra fácilmente los perfiles de tus estudiantes, incluyendo información de contacto y progreso académico.
                </p>
              </Card>
              <Card title="Control de Asistencia" subTitle="">
                <i className="pi pi-calendar" style={{ fontSize: '2em', marginBottom: '0.5em' }}></i>
                <p>
                  Registra y monitorea la asistencia de los estudiantes con un sistema intuitivo y eficiente.
                </p>
              </Card>
              <Card title="Calificaciones y Evaluaciones" subTitle="">
                <i className="pi pi-chart-line" style={{ fontSize: '2em', marginBottom: '0.5em' }}></i>
                <p>
                  Crea, asigna y califica tareas y exámenes de manera sencilla, con análisis automático del rendimiento.
                </p>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Lo que dicen nuestros usuarios
            </h2>
            <Carousel value={carouselItems} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={itemTemplate} />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Nuestro impacto en números
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card title="10,000+" subTitle="Profesores activos" />
              <Card title="500,000+" subTitle="Estudiantes gestionados" />
              <Card title="98%" subTitle="Satisfacción del usuario" />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 EduGest. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Términos de servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}