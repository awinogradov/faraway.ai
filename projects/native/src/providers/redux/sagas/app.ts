import { takeEvery, call, put } from 'redux-saga/effects';
import { Clipboard } from 'react-native';
import isUrl from 'validator/lib/isURL';

// import { scrapInstagram, googleMapsSearch } from '../../functions';
import { navigate as nativeNavigate } from '../../navigation';
import { appActionTypes } from '../constants/app';
import { clipboardRead, clipboardWrite, navigate } from '../actions/app';
// import { visibilityChange, addActionTypes, loadPointDescriptionSuccess } from '../actions/add';

function* callNativeNavigation(action: ReturnType<typeof navigate>) {
  yield call(nativeNavigate, action.payload);
}

function* resolveClipboardContent() {
  const clipboardContent = yield call(Clipboard.getString);

  yield put(clipboardRead(clipboardContent));

  if (isUrl(clipboardContent)) {
    // const post = yield call(scrapInstagram, { post: clipboardContent });

    yield put(clipboardWrite(clipboardContent));
    // yield put(navigate(allowedScreens.Add));
    // yield put(
    //   visibilityChange({
    //     visible: true,
    //     kind: 'clipboard',
    //     data: post,
    //   }),
    // );
  }
}

export function* appSaga() {
  yield takeEvery(appActionTypes.NAVIGATE, callNativeNavigation);
  yield takeEvery(appActionTypes.STATE_ACTIVE, resolveClipboardContent);
  // yield takeEvery(addActionTypes.LOAD_POINT_DESCRIPTION, loadPointDescription);
}

// function* loadPointDescription(action) {
//   const googleMapsData = yield call(googleMapsSearch, action.payload);
//   yield put(loadPointDescriptionSuccess(googleMapsData));
// }
