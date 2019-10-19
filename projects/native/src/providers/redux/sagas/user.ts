import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { userActionTypes, userAuthError, userAuthChangeInProgress, userAuthChangeSuccess } from '../actions/user';

const carriedAuth = auth();

function* gglSignin() {
  yield call(GoogleSignin.configure);

  try {
    const userData = yield call(GoogleSignin.signIn);
    const credential = yield call(auth.GoogleAuthProvider.credential, userData.idToken);

    yield put(userAuthChangeInProgress());

    const { user } = yield call(carriedAuth.signInWithCredential.bind(carriedAuth), credential);
    yield put(userAuthChangeSuccess(user));
  } catch (e) {
    yield put(userAuthError(e));
  }
}

function* fbSignin() {
  const result = yield call(LoginManager.logInWithPermissions, ['public_profile', 'email']);

  try {
    if (result.isCancelled) {
      throw new Error('User cancelled request');
    }

    const data = yield call(AccessToken.getCurrentAccessToken);

    if (!data) {
      throw new Error('Something went wrong obtaining the users access token');
    }

    const credential = yield call(auth.FacebookAuthProvider.credential, data.accessToken);

    yield put(userAuthChangeInProgress());

    const { user } = yield call(carriedAuth.signInWithCredential.bind(carriedAuth), credential);
    yield put(userAuthChangeSuccess(user));
  } catch (e) {
    yield put(userAuthError(e));
  }
}

function* signout() {
  yield put(userAuthChangeInProgress());
  yield call(carriedAuth.signOut.bind(carriedAuth));
  yield put(userAuthChangeSuccess(null));
}

function* inProgress() {
  yield put(push('/inprogress'));
}

function* success(action) {
  yield put(push(action.payload ? '/' : '/signin'));
}

export function* userSaga() {
  yield takeEvery(userActionTypes.GGL_SIGNIN, gglSignin);
  yield takeEvery(userActionTypes.FB_SIGNIN, fbSignin);
  yield takeEvery(userActionTypes.SIGNOUT, signout);
  yield takeEvery(userActionTypes.AUTH_CHANGE_IN_PROGRESS, inProgress);
  yield takeEvery(userActionTypes.AUTH_CHANGE_SUCCESS, success);
}
