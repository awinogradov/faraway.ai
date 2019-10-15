import {Navigation} from 'react-native-navigation';

import './src/screens';
import './src/providers/redux/subscriptions/auth';
import './src/providers/redux/subscriptions/appState';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'farawayai.root',
      },
    },
  });
});
