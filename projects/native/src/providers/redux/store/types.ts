import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStateStatus } from 'react-native';
import { RouterState } from 'connected-react-router';
import { GoogleMapRes, InstagramScrapedPost } from 'faraway.ai-functions';

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
    data?: InstagramScrapedPost;
    desciption?: GoogleMapRes;
  };
  app: {
    state: AppStateStatus;
  };
  router: RouterState;
}
