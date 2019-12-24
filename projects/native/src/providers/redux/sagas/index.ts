import { all } from 'redux-saga/effects';

import { databaseSaga } from './database';
import { userSaga } from './user';
import { appSaga } from './app';

export default function* rootSaga() {
  yield all([userSaga(), databaseSaga(), appSaga()]);
}
