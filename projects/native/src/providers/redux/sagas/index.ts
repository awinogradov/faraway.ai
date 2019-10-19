import { all } from 'redux-saga/effects';

import { clipboardSaga } from './clipboard';
import { userSaga } from './user';

export default function* rootSaga() {
  yield all([userSaga(), clipboardSaga()]);
}
