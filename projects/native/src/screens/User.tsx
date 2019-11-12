import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { bindActionCreators, Dispatch } from 'redux';

import { userSignout } from '../providers/redux/actions/user';

const mapStateToProps = state => ({ user: state.user });
const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators({ signout: userSignout }, dispatch);

export type UserScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

const UserScreen: React.FC<UserScreenProps> = props => {
  return (
    <View>
      <Text>Welcome {props.user.auth.email}</Text>

      <Button onPress={props.signout} title="Logout" />
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(UserScreen);
