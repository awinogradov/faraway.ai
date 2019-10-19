import React from 'react';
import { connect } from 'react-redux';

import { GlobalState } from '../providers/redux/store';

import Signin from './Signin';
import Page from './Page';

export interface RootScreenProps {
  user: GlobalState['user'];
}

const Root: React.FC<RootScreenProps> = ({ user }) => (user.auth ? <Page /> : <Signin />);

const mapStateToProps = ({ user }: GlobalState) => ({
  user,
});

export default connect(mapStateToProps)(Root);
