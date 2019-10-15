import {Auth} from '@react-native-firebase/auth';

export enum userActionTypes {
  AUTH_CHANGE = 'user/AUTH_CHANGE',
}

export type userActions = ReturnType<typeof userAuthChange>;

export const userAuthChange = (user: Auth.User) => ({
  type: userActionTypes.AUTH_CHANGE,
  payload: user,
});

export const extractUser = (user: any) => (user ? user._user : null);
