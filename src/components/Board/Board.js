import React from "react";
import Square from "./../Square/Square";

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      <div className="board_inside">
        {squares?.map((row, i) => (
          <div key={"s" + i} className="d-flex">
            {row?.map((value, j) => (
              <Square
                key={"s" + i + j}
                value={value}
                onClick={() => onClick(i, j)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
