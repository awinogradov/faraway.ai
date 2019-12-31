import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStateStatus } from 'react-native';
// import { GoogleMapRes, InstagramScrapedPost } from 'faraway.ai-functions';

import { allowedScreens, allowedBottomSheetScreens } from '../../navigation';

export interface GlobalState {
  user: {
    auth?: FirebaseAuthTypes.User;
    error?: Error;
  };
  clipboard: {
    content?: string;
  };
  add: {
    visible: boolean;
    kind?: 'clipboard';
    // data?: InstagramScrapedPost;
    // desciption?: GoogleMapRes;
  };
  app: {
    state?: AppStateStatus;
    currentScreen: allowedScreens;
    clipboard?: string;
    bottomSheet: {
      visible: boolean;
      component: allowedBottomSheetScreens | null;
    };
    tabs: {
      visible: boolean;
    };
  };
}
