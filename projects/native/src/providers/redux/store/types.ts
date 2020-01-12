import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppStateStatus } from 'react-native';

import { allowedScreens, allowedBottomSheetScreens } from '../../navigation';

export interface GlobalState {
  process: Record<
    string,
    | {
        inProgress?: boolean;
        isSuccess?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value?: any;
        error?: Error;
      }
    | undefined
  >;
  user: {
    auth?: FirebaseAuthTypes.User;
    error?: Error;
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
