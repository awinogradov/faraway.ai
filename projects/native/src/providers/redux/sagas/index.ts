import { all } from 'redux-saga/effects';

import { clipboardSaga } from './clipboard';
import { databaseSaga } from './database';
import { userSaga } from './user';

export default function* rootSaga() {
  yield all([userSaga(), clipboardSaga(), databaseSaga()]);
}
