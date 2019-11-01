import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStateStatus } from 'react-native';

export interface GlobalState {
  user: {
    auth: FirebaseAuthTypes.User | null;
    error?: Error;
  };
  clipboard: {
    content?: string;
  };
  add: {
    visible: boolean;
    kind?: 'clipboard';
    data?: object;
  };
  app: {
    state: AppStateStatus;
  };
}
