import { put, takeEvery, call } from 'redux-saga/effects';
import { Clipboard } from 'react-native';
import isUrl from 'validator/lib/isURL';
import { firebase } from '@react-native-firebase/functions';

import { appActionTypes } from '../actions/app';
import { clipboardRead, clipboardWrite } from '../actions/clipboard';

async function callCloudFunctionParse(url: string) {
  try {
    const data = await firebase.functions().httpsCallable('parse')({ url });
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

function* resolveClipboardContent() {
  const clipboardContent = yield call(Clipboard.getString);

  yield put(clipboardRead(clipboardContent));

  if (isUrl(clipboardContent)) {
    yield call(callCloudFunctionParse, clipboardContent);

    yield put(clipboardWrite(clipboardContent));
  }
}

export function* clipboardSaga() {
  yield takeEvery(appActionTypes.STATE_ACTIVE, resolveClipboardContent);
}
