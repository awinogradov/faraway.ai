import { takeEvery, put, call } from 'redux-saga/effects';
import database from '@react-native-firebase/database';

import { addActionTypes, addPointSuccess } from '../actions/add';

async function addToCloak(data) {
  const ref = database().ref(`/cloak/test/${data.location.id}`);

  return ref.set(data);
}

function* addPointToDatabase(data) {
  yield call(addToCloak, data.payload);

  yield put(addPointSuccess());
}

export function* databaseSaga() {
  yield takeEvery(addActionTypes.ADD_POINT, addPointToDatabase);
}
