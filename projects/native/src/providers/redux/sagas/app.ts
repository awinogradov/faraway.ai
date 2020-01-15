import { takeEvery, call, put } from 'redux-saga/effects';
import { Clipboard } from 'react-native';
import isUrl from 'validator/lib/isURL';

// import { scrapInstagram, googleMapsSearch } from '../../functions';
import { appNavigate, showNativeBottomSheet, closeNativeBottomSheet, calcSnapForComponent } from '../../navigation';
import { appActionTypes } from '../constants/app';
import {
  clipboardRead,
  clipboardWrite,
  navigate,
  showBottomSheet,
  closeBottomSheet,
  setBottomSheetComponent,
  closeTabs,
  showTabs,
} from '../actions/app';

function* callNativeNavigation(action: ReturnType<typeof navigate>) {
  yield call(appNavigate, action.payload);
}

function* callShowNativeBottomSheet(action: ReturnType<typeof showBottomSheet>) {
  yield put(closeTabs());
  yield put(setBottomSheetComponent(action.payload.component));
  yield call(showNativeBottomSheet, calcSnapForComponent(action.payload.component));
}

function* callCloseNativeBottomSheet(action: ReturnType<typeof closeBottomSheet>) {
  yield put(showTabs());
  yield call(closeNativeBottomSheet, action.payload);
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
  yield takeEvery(appActionTypes.SHOW_BOTTOM_SHEET, callShowNativeBottomSheet);
  yield takeEvery(appActionTypes.CLOSE_BOTTOM_SHEET, callCloseNativeBottomSheet);
  // yield takeEvery(addActionTypes.LOAD_POINT_DESCRIPTION, loadPointDescription);
}

// function* loadPointDescription(action) {
//   const googleMapsData = yield call(googleMapsSearch, action.payload);
//   yield put(loadPointDescriptionSuccess(googleMapsData));
// }
