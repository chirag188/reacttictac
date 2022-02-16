import * as actionLabels from "../../actionLabels";

export const dummyAction = () => {
  return {
    type: actionLabels.DUMMY_ACTION_SAGA,
  };
};
export const dummyActionSuccess = () => {
  return {
    type: actionLabels.DUMMY_ACTION_SUCCESS,
  };
};

export const gameSetup = (payload) => {
  return {
    type: actionLabels.GAME_SETUP,
    payload,
  };
};
export const gameSetupSuccess = (history) => {
  return {
    type: actionLabels.GAME_SETUP_SUCCESS,
    payload: history,
  };
};
export const gameSetupFail = (message) => {
  return {
    type: actionLabels.GAME_SETUP_FAIL,
    payload: message,
  };
};

export const move = (payload) => {
  return {
    type: actionLabels.MOVE,
    payload,
  };
};
export const moveSuccess = (history) => {
  return {
    type: actionLabels.MOVE_SUCCESS,
    payload: history,
  };
};
export const moveFail = (message) => {
  return {
    type: actionLabels.MOVE_FAIL,
    payload: message,
  };
};

export const setWinner = (payload) => {
  return {
    type: actionLabels.SET_WINNER,
    payload,
  };
};
export const setWinnerSuccess = (winnerName) => {
  return {
    type: actionLabels.SET_WINNER_SUCCESS,
    payload: winnerName,
  };
};
export const setWinnerFail = (message) => {
  return {
    type: actionLabels.SET_WINNER_FAIL,
    payload: message,
  };
};
