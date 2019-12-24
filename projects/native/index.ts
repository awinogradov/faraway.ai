import { Navigation } from 'react-native-navigation';

import './src/providers/redux/subscriptions/appState';
import { registerScreens, pushInitializeScreen } from './src/providers/navigation';

registerScreens();
Navigation.events().registerAppLaunchedListener(() => pushInitializeScreen());
