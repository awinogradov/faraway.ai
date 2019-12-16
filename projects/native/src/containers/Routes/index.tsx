import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-native';

import { GlobalState } from '../../providers/redux/store';
import { SigninScreen } from '../../screens/SigninScreen';
import { DiscoveryScreen } from '../../screens/DiscoveryScreen';
import { NotificationsScreen } from '../../screens/NotificationsScreen';
import { JourneyScreen } from '../../screens/JourneyScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { ProgressScreen } from '../../screens/ProgressScreen';

export enum AllowedRoutes {
  progress = '/inprogress',
  signin = '/signin',
  notificatitons = '/notificatitons',
  discovery = '/',
  add = '/add',
  journey = '/journey',
  profile = '/profile',
}

export const Routes: React.FC = () => {
  const auth = useSelector((state: GlobalState) => state.user.auth);

  return auth ? (
    <Switch>
      <Route exact path={AllowedRoutes.discovery} component={DiscoveryScreen} />
      <Route path={AllowedRoutes.notificatitons} component={NotificationsScreen} />
      <Route path={AllowedRoutes.journey} component={JourneyScreen} />
      <Route path={AllowedRoutes.profile} component={ProfileScreen} />

      <Route path={AllowedRoutes.progress} component={ProgressScreen} />
    </Switch>
  ) : (
    <SigninScreen />
  );
};
