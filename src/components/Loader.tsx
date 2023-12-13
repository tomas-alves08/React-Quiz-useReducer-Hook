import { FC } from "react";
const Loader: FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
};

export default Loader;
