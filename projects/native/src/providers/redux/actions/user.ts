import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { createAction, createEmptyAction } from '../../../utils/actionCreator';
import { userActionTypes } from '../constants/user';

export const userAuthError = (error: Error) => createAction(userActionTypes.AUTH_CHANGE_ERROR, error);
export const userAuthChangeInProgress = () => createEmptyAction(userActionTypes.AUTH_CHANGE_IN_PROGRESS);
export const userAuthChangeSuccess = (user?: FirebaseAuthTypes.User) =>
  createAction(userActionTypes.AUTH_CHANGE_SUCCESS, user);

export const userSetId = (id?: string) => createAction(userActionTypes.SET_ID, id);

export const userFbSignin = () => createEmptyAction(userActionTypes.FB_SIGNIN);
export const userGglSignin = () => createEmptyAction(userActionTypes.GGL_SIGNIN);
export const userSignout = () => createEmptyAction(userActionTypes.SIGNOUT);
