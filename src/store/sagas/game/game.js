/* eslint-disable import/prefer-default-export */
import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  dummyActionSuccess,
  gameSetupSuccess,
  moveSuccess,
  setWinnerSuccess,
} from "../../actions";
import * as actionLabels from "../../actionLabels";

// eslint-disable-next-line no-unused-vars
function* dummyActionSaga(action) {
  yield call([localStorage, "setItem"], "dummyAction", "Succeeded");
  yield put(dummyActionSuccess());
}

function* gameSetupSaga({ payload }) {
  try {
    const { boardWidth } = payload;
    yield put(gameSetupSuccess({ boardWidth }));
  } catch (err) {
    console.log(err);
    // yield put(gameSetupFail(err.massage));
  }
}

function* moveSaga({ payload }) {
  try {
    const { row, col, move } = payload;
    yield put(moveSuccess({ row, col, move }));
  } catch (err) {
    console.log(err);
    // yield put(gameSetupFail(err.massage));
  }
}
function* setWinnerSaga({ payload }) {
  try {
    const { winnerName } = payload;
    yield put(setWinnerSuccess({ winnerName }));
  } catch (err) {
    console.log(err);
  }
}

export default function* rootsaga() {
  yield all([yield takeEvery(actionLabels.DUMMY_ACTION_SAGA, dummyActionSaga)]);
  yield all([yield takeEvery(actionLabels.GAME_SETUP, gameSetupSaga)]);
  yield all([yield takeEvery(actionLabels.MOVE, moveSaga)]);
  yield all([yield takeEvery(actionLabels.SET_WINNER, setWinnerSaga)]);
}
