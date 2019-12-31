import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import { InitializeScreen } from './src/screens/InitializeScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { SigninScreen } from './src/screens/SigninScreen';
import { DiscoveryScreen } from './src/screens/DiscoveryScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { Bar } from './src/containers/Bar';
import { BottomSheet } from './src/containers/BottomSheet';
import { store } from './src/providers/redux/store';
import { allowedScreens } from './src/providers/navigation';
import { setAppNavigator } from './src/providers/navigation/tabs';
import { setBottomSheetNavigator } from './src/providers/navigation/bottomSheet';

enableScreens();

const Auth = createStackNavigator({ SigninScreen }, { headerMode: 'none' });
const App = createBottomTabNavigator(
  {
    DiscoveryScreen,
    NotificationsScreen,
    ProfileScreen,
  },
  {
    initialRouteName: allowedScreens.Discovery,
    tabBarComponent: props => <Bar {...props} />,
  },
);

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      InitializeScreen,
      ProgressScreen,
      Auth,
      App,
    },
    {
      initialRouteName: allowedScreens.Initialize,
    },
  ),
);

const Root = () => (
  <Provider store={store}>
    <Navigation
      ref={navigatorRef => {
        if (navigatorRef) {
          setAppNavigator(navigatorRef);
        }
      }}
    />

    <BottomSheet
      forwardRef={navigatorRef => {
        if (navigatorRef) {
          setBottomSheetNavigator(navigatorRef);
        }
      }}
    />
  </Provider>
);

export default Root;
