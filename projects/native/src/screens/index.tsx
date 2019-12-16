import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { ConnectedRouter } from 'connected-react-router';
import * as Sentry from '@sentry/react-native';

import { store, history } from '../providers/redux/store';
import { Routes } from '../containers/Routes';

if (!__DEV__) {
  Sentry.init({
    dsn: 'https://04ade034a9274a4cbd8905d2403eb475@sentry.io/1813871',
    environment: 'production', // TODO: setup staging for TestFlight apps
  });
}

export const App = () => (
  <NativeRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </NativeRouter>
);
