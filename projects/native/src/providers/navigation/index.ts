/* eslint-disable no-use-before-define */
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import { DiscoveryScreen } from '../../screens/DiscoveryScreen';
import { SigninScreen } from '../../screens/SigninScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { AddScreen } from '../../screens/AddScreen';
import { InitializeScreen } from '../../screens/InitializeScreen';
import { ProgressScreen } from '../../screens/ProgressScreen';

export enum allowedScreens {
  Initialize = 'InitializeScreen',
  Discovery = 'DiscoveryScreen',
  Signin = 'SigninScreen',
  Profile = 'ProfileScreen',
  Add = 'AddScreen',
  Progress = 'ProgressScreen',
}

const navigationScreens: Record<allowedScreens, React.ComponentType> = {
  [allowedScreens.Initialize]: InitializeScreen,
  [allowedScreens.Discovery]: DiscoveryScreen,
  [allowedScreens.Signin]: SigninScreen,
  [allowedScreens.Profile]: ProfileScreen,
  [allowedScreens.Add]: AddScreen,
  [allowedScreens.Progress]: ProgressScreen,
};

export const navigationFunctions: Record<allowedScreens, () => void> = {
  [allowedScreens.Initialize]: pushInitializeScreen,
  [allowedScreens.Discovery]: pushDiscoveryScreen,
  [allowedScreens.Signin]: pushSigninScreen,
  [allowedScreens.Profile]: pushProfileScreen,
  [allowedScreens.Add]: pushAddScreen,
  [allowedScreens.Progress]: pushProgressScreen,
};

export function registerScreens() {
  const screens = Object.keys(navigationScreens) as Array<keyof typeof navigationScreens>;

  screens.forEach(key => Navigation.registerComponentWithRedux(key, () => navigationScreens[key], Provider, store));
}

export function pushDiscoveryScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: allowedScreens.Discovery,
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function pushProgressScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: allowedScreens.Progress,
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function pushAddScreen() {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: allowedScreens.Add,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
    },
  });
}

export function pushProfileScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: allowedScreens.Profile,
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}

export function pushInitializeScreen() {
  Navigation.setRoot({
    root: {
      component: {
        name: allowedScreens.Initialize,
      },
    },
  });
}

export function pushSigninScreen() {
  Navigation.setRoot({
    root: {
      component: {
        name: allowedScreens.Signin,
      },
    },
  });
}
