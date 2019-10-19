import { AppRegistry } from 'react-native';

import './src/providers/redux/subscriptions/auth';
import './src/providers/redux/subscriptions/appState';
import { App } from './src/screens';
import { name } from './app.json';

AppRegistry.registerComponent(name, () => App);
