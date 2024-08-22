import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => (
  <CirclesWithBar
    height="100"
    width="100"
    color="#00BFFF" // Color celeste
    outerCircleColor="#00BFFF"
    innerCircleColor="#00BFFF"
    barColor="#00BFFF"
    ariaLabel="circles-with-bar-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
);

export default Loader;