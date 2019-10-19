import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum userActionTypes {
  AUTH_CHANGE = 'user/AUTH_CHANGE',
}

export const userAuthChange = (user: FirebaseAuthTypes.User) => ({
  type: userActionTypes.AUTH_CHANGE,
  payload: user,
});

export type userActions = ReturnType<typeof userAuthChange>;
