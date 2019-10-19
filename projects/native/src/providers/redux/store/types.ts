import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStateStatus } from 'react-native';

export interface GlobalState {
  user: {
    auth: FirebaseAuthTypes.User | null;
  };
  clipboard: {
    content?: string;
  };
  app: {
    state: AppStateStatus;
  };
}
