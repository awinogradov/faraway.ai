import { put, takeEvery, call } from 'redux-saga/effects';
import { Clipboard } from 'react-native';
import isUrl from 'validator/lib/isURL';
import { firebase } from '@react-native-firebase/functions';
import { InstagramParseProps } from 'faraway.ai-functions';

import { appActionTypes } from '../actions/app';
import { clipboardRead, clipboardWrite } from '../actions/clipboard';
import { visibilityChange } from '../actions/add';

async function callCloudFunctionParse(url: string) {
  const remoteFunctionProps: InstagramParseProps = {
    post: url,
  };
  try {
    return await firebase.functions().httpsCallable('parse-instagram')(remoteFunctionProps);
  } catch (e) {
    console.error(e);
  }

  return Promise.resolve({ data: undefined });
}

function* resolveClipboardContent() {
  const clipboardContent = yield call(Clipboard.getString);

  yield put(clipboardRead(clipboardContent));

  if (isUrl(clipboardContent)) {
    const { data } = yield call(callCloudFunctionParse, clipboardContent);

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
