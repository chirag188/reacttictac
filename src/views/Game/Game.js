/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../../components/Board/Board";
import { gameSetup, move } from "../../store/actions";
import io from "socket.io-client";

function Game({ boardWidth }) {
  const [socketIo, setSocketIo] = useState(null);
  const { boardState, xIsNext, winner, winnerName } = useSelector(
    (state) => state.gameReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("http://localhost:8000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocketIo(socket);
    socket.on("move", function (i, j) {
      dispatch(move({ row: i, col: j, move: xIsNext }));
    });
  }, []);

  useEffect(() => {
    dispatch(gameSetup({ boardWidth }));
  }, [boardWidth]);

  const handleClick = (i, j) => {
    !winner &&
      xIsNext === window.sessionStorage.getItem("player") &&
      socketIo.emit("move", i, j);
  };
  return (
    <div>
      <Board squares={boardState} onClick={handleClick} />
      <h1>
        {winner
          ? "Winner is : " +
            (winnerName === window.sessionStorage.getItem("player")
              ? "You Win"
              : "You Loss")
          : "Turn is : " +
            (xIsNext === window.sessionStorage.getItem("player")
              ? "Your Turn"
              : "Opposite")}
      </h1>
    </div>
  );
}

export default Game;
