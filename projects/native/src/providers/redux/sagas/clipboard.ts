import { put, takeEvery, call } from 'redux-saga/effects';
import { Clipboard } from 'react-native';
import isUrl from 'validator/lib/isURL';

import { scrapInstagram } from '../../functions';
import { appActionTypes } from '../actions/app';
import { clipboardRead, clipboardWrite } from '../actions/clipboard';
import { visibilityChange } from '../actions/add';

function* resolveClipboardContent() {
  const clipboardContent = yield call(Clipboard.getString);

  yield put(clipboardRead(clipboardContent));

  if (isUrl(clipboardContent)) {
    const data = yield call(scrapInstagram, { post: clipboardContent });

    yield put(clipboardWrite(clipboardContent));
    yield put(
      visibilityChange({
        visible: true,
        kind: 'clipboard',
        data,
      }),
    );
  }
}

export function* clipboardSaga() {
  yield takeEvery(appActionTypes.STATE_ACTIVE, resolveClipboardContent);
}
