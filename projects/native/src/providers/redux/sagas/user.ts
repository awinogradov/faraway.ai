import { push } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';

import { userActionTypes } from '../actions/user';

function* resolveAuth({ payload }) {
  yield put(push(payload ? '/' : '/signin'));
}

export function* userSaga() {
  // @ts-ignore
  yield takeEvery(userActionTypes.AUTH_CHANGE, resolveAuth);
}
