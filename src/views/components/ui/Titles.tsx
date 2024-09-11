import React from "react";

import "../../../public/assets/Titles.css";

interface CustomTitleProps {
  title: string;
}

const CustomTitle: React.FC<CustomTitleProps> = ({ title }) => {
  return (
    <div className="custom-title">
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default CustomTitle;
