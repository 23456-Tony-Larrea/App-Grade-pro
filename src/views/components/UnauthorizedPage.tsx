import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/animations/Animation - 1738001410652.json"; // Importa tu animación

const UnauthorizedPage: React.FC = () => {
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
      <h1>401 - No autorizado</h1>
      <p>Lo sentimos, no tienes acceso a esta página.</p>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default UnauthorizedPage;
