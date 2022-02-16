import { combineReducers } from "redux";

import gameReducer from "./game/game";

const allReducers = combineReducers({
  gameReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
