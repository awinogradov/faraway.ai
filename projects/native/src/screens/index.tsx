import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Redirect } from 'react-router-native';
import { ConnectedRouter } from 'connected-react-router';

import { store, history } from '../providers/redux/store';

import Root from './Root';
import Signin from './Signin';

interface RootRouteProps {
  path: string;
}
const RootRoute: React.FC<RootRouteProps> = ({ children, ...rest }) => (
  <Route
    {...rest}
    exact
    render={({ location }) =>
      store.getState().user.auth ? children : <Redirect to={{ pathname: '/signin', state: { from: location } }} />
    }
  />
);

export const App = () => (
  <NativeRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RootRoute path="/">
          <Root />
        </RootRoute>
        <Route exact path="/signin" component={Signin} />
      </ConnectedRouter>
    </Provider>
  </NativeRouter>
);
