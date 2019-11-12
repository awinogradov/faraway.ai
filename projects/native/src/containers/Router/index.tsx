import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Route, Redirect } from 'react-router-native';

import { GlobalState } from '../../providers/redux/store';

const mapStateToProps = (state: GlobalState) => ({ auth: state.user.auth });
const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

export enum AllowedRoutes {
  progress = '/inprogress',
  signin = '/signin',
  discover = '/',
  collections = '/collections',
  add = '/add',
  trip = '/trip',
  user = '/user',
}

interface ProtectedRouteBaseProps {
  path: string;
  component: React.ComponentType;
}

export type ProtectedRouteProps = ProtectedRouteBaseProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, ...props }) => {
  const AllowedComponent = props.component;

  return (
    <Route
      {...props}
      exact
      render={({ location: from }) =>
        auth ? <AllowedComponent /> : <Redirect to={{ pathname: AllowedRoutes.signin, state: { from } }} />
      }
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(ProtectedRoute);
