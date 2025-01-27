import Lottie from "react-lottie";
import animationData from "../../public/animations/Animation - 1738000427360.json"; // Asegúrate de importar tu archivo JSON

const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default NotFoundPage;
