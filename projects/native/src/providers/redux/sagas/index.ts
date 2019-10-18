import { all } from 'redux-saga/effects';

import { clipboardSaga } from './clipboard';

export default function* rootSaga() {
  yield all([clipboardSaga()]);
}
