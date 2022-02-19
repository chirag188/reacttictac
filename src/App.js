import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Game from "./views/Game/Game";

function App() {
  const [boardWidth, SetBoardWidth] = useState(3);
  const [socetIo, setSocketIo] = useState(null);
  const [player, setPlayer] = useState(
    window.sessionStorage.getItem("player") ?? null
  );
  useEffect(() => {
    const socket = io("https://tictacreacttask.herokuapp.com", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocketIo(socket);
    socket.on("boardwidth", function (msg) {
      SetBoardWidth(+msg);
    });
    // return () => socket.close();
  }, []);
  const inputChange = (event) => {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    // SetBoardWidth(value);
    socetIo.emit("boardwidth", value);
  };
  const onChangePlayer = (value) => {
    window.sessionStorage.setItem("player", value);
    setPlayer(value);
  };
  return (
    <div className="App">
      <h1>Welcome in Peer to Peer Tic Tac Game</h1>
      <div>
        <input
          type="number"
          min={3}
          max={10}
          value={boardWidth}
          onChange={(event) => inputChange(event)}
        />
        <button>Submit</button>
      </div>
      <div>
        <input
          type="radio"
          name="player"
          className="radio-input"
          value="x"
          disabled={player}
          onChange={(event) => onChangePlayer(event.target.value)}
          checked={window.sessionStorage.getItem("player") === "x"}
        />
        <label className="radio-label">X</label>
        <input
          type={"radio"}
          name="player"
          value={"o"}
          disabled={player}
          onChange={(event) => onChangePlayer(event.target.value)}
          checked={window.sessionStorage.getItem("player") === "o"}
        />
        <label className="radio-label">O</label>
      </div>
      <Game boardWidth={boardWidth}></Game>
    </div>
  );
}

export default App;
