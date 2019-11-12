import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';
import { ConnectedRouter } from 'connected-react-router';

import { store, history } from '../providers/redux/store';
import MainScreen from '../containers/MainScreen';
import ProtectedRoute, { AllowedRoutes } from '../containers/Router';

import SigninScreen from './Signin';
import DiscoverScreen from './Discover';
import CollectionsScreen from './Collections';
import TripScreen from './Trip';
import UserScreen from './User';
import ProgressScreen from './Progress';

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
