import { put, takeEvery, call } from 'redux-saga/effects';
import { Clipboard } from 'react-native';
import isUrl from 'validator/lib/isURL';

import { scrapInstagram, googleMapsSearch } from '../../functions';
import { appActionTypes } from '../actions/app';
import { clipboardRead, clipboardWrite } from '../actions/clipboard';
import { visibilityChange, addActionTypes, loadPointDescriptionSuccess } from '../actions/add';

function* resolveClipboardContent() {
  const clipboardContent = yield call(Clipboard.getString);

  yield put(clipboardRead(clipboardContent));

  if (isUrl(clipboardContent)) {
    const post = yield call(scrapInstagram, { post: clipboardContent });

    yield put(clipboardWrite(clipboardContent));
    yield put(
      visibilityChange({
        visible: true,
        kind: 'clipboard',
        data: post,
      }),
    );
  }
}

function* loadPointDescription(action) {
  const googleMapsData = yield call(googleMapsSearch, action.payload);
  yield put(loadPointDescriptionSuccess(googleMapsData));
}

export function* clipboardSaga() {
  yield takeEvery(appActionTypes.STATE_ACTIVE, resolveClipboardContent);
  yield takeEvery(addActionTypes.LOAD_POINT_DESCRIPTION, loadPointDescription);
}
