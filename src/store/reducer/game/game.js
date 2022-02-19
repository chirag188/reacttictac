/* eslint-disable import/no-anonymous-default-export */
import * as actionLabels from "../../actionLabels";

const initialState = {
  action: false,
  boardState: null,
  errorMsg: null,
  winner: false,
  xIsNext: "x",
  boardWidth: 3,
};

const checkRow = (arr, i, xO, boardWidth) => {
  for (let j = 0; j < boardWidth; j++) {
    if (arr[i][j] !== xO) return false;
  }
  return true;
};
const checkCol = (arr, i, xO, boardWidth) => {
  for (let j = 0; j < boardWidth; j++) {
    if (arr[j][i] !== xO) return false;
  }
  return true;
};
const checkRightDig = (arr, xO, boardWidth) => {
  let i = 0;
  while (i < boardWidth && arr[i][i] === xO) i++;
  if (i === boardWidth) return true;
  return false;
};
const checkLeftDig = (arr, xO, boardWidth) => {
  let i = 0;
  let j = boardWidth - 1;
  while (i < boardWidth && j >= 0 && arr[i][j] === xO) {
    i++;
    j--;
  }
  if (i === boardWidth && j === -1) return true;
  return false;
};
const checkWinner = (arr, xO, row, col, boardWidth) => {
  if (checkRow(arr, row, xO, boardWidth)) return true;
  if (checkCol(arr, col, xO, boardWidth)) return true;
  if (row === col) return checkRightDig(arr, xO, boardWidth);
  if ((row + col === boardWidth - 1, boardWidth))
    return checkLeftDig(arr, xO, boardWidth);
  return false;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionLabels.GAME_SETUP_SUCCESS: {
      const { boardWidth } = action.payload;
      return {
        ...initialState,
        boardWidth,
        boardState: Array(boardWidth)
          .fill(null)
          .map(() => Array(boardWidth).fill(null)),
      };
    }
    case actionLabels.GAME_SETUP_FAIL: {
      return {
        ...state,
        errorMsg: action.payload.message,
      };
    }
    case actionLabels.MOVE_SUCCESS: {
      const { row, col } = action.payload;
      const historyPoint = state.boardState;
      if (state.winner || historyPoint[row][col]) return { ...state };
      historyPoint[row][col] = state.xIsNext;
      return {
        ...state,
        boardState: historyPoint,
        xIsNext: state.xIsNext === "x" ? "o" : "x",
        winner: checkWinner(
          historyPoint,
          state.xIsNext,
          row,
          col,
          state.boardWidth
        ),
        winnerName: state.xIsNext,
      };
    }
    case actionLabels.SET_WINNER_SUCCESS: {
      const { winnerName } = action.payload;
      return {
        ...state,
        winner: !!winnerName,
        winnerName: winnerName,
      };
    }
    case actionLabels.SET_WINNER_FAIL: {
      return {
        ...state,
        errorMsg: action.payload.message,
      };
    }
    case actionLabels.DUMMY_ACTION_SUCCESS: {
      return {
        ...state,
        action: true,
      };
    }
    default:
      return state;
  }
};
