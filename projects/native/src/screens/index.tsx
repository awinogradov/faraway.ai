import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { ConnectedRouter } from 'connected-react-router';
import * as Sentry from '@sentry/react-native';

import { store, history } from '../providers/redux/store';
import MainScreen from '../containers/MainScreen';
import ProtectedRoute, { AllowedRoutes } from '../containers/Router';

import SigninScreen from './Signin';
import DiscoverScreen from './Discover';
import CollectionsScreen from './Collections';
import TripScreen from './Trip';
import UserScreen from './User';
import ProgressScreen from './Progress';

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
        <MainScreen>
          <ProtectedRoute path={AllowedRoutes.discover} component={DiscoverScreen} />
          <ProtectedRoute path={AllowedRoutes.collections} component={CollectionsScreen} />
          <ProtectedRoute path={AllowedRoutes.trip} component={TripScreen} />
          <ProtectedRoute path={AllowedRoutes.user} component={UserScreen} />
        </MainScreen>

        <Route exact path={AllowedRoutes.signin} component={SigninScreen} />

        <Route exact path={AllowedRoutes.progress} component={ProgressScreen} />
      </ConnectedRouter>
    </Provider>
  </NativeRouter>
);
