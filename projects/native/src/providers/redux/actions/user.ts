import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum userActionTypes {
  AUTH_CHANGE_IN_PROGRESS = 'user/AUTH_CHANGE_IN_PROGRESS',
  AUTH_CHANGE_SUCCESS = 'user/AUTH_CHANGE_SUCCESS',
  AUTH_CHANGE_ERROR = 'user/AUTH_CHANGE_ERROR',
  FB_SIGNIN = 'user/FB_SIGNIN',
  GGL_SIGNIN = 'user/GGL_SIGNIN',
  SIGNOUT = 'user/SIGNOUT',
}

export const userAuthError = (error: Error) => ({
  type: userActionTypes.AUTH_CHANGE_ERROR,
  payload: error,
});

export const userAuthChangeInProgress = () => ({
  type: userActionTypes.AUTH_CHANGE_IN_PROGRESS,
  payload: undefined,
});

export const userAuthChangeSuccess = (user: FirebaseAuthTypes.User) => ({
  type: userActionTypes.AUTH_CHANGE_SUCCESS,
  payload: user,
});

export const userFbSignin = () => ({
  type: userActionTypes.FB_SIGNIN,
  payload: undefined,
});

export const userGglSignin = () => ({
  type: userActionTypes.GGL_SIGNIN,
  payload: undefined,
});

export const userSignout = () => ({
  type: userActionTypes.SIGNOUT,
  payload: undefined,
});

export type userActions = ReturnType<typeof userFbSignin | typeof userGglSignin | typeof userSignout>;
