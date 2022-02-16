/* eslint-disable import/prefer-default-export */
import { all } from 'redux-saga/effects';

import dummySagas from './game/game';

export default function* rootSaga() {
    yield all([dummySagas()]);
}
