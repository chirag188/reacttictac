import React from "react";

const Square = ({ value, onClick }) => {
  const style = value ? `squares ${value}` : `squares`;

  return (
    <p className={style} onClick={onClick}>
      {value}
    </p>
  );
};

export default Square;
