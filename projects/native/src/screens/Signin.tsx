import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { View, Button, Text } from 'react-native';

import { userFbSignin, userGglSignin, userSignout } from '../providers/redux/actions/user';
import { GlobalState } from '../providers/redux/store';

const mapStateToProps = (state: GlobalState) => ({ error: state.user.error });
const mapDispatchProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fbSignin: userFbSignin,
      gglSignin: userGglSignin,
      signout: userSignout,
    },
    dispatch,
  );

export type SigninScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

const Signin: React.FC<SigninScreenProps> = props => (
  <View style={{ paddingTop: 100 }}>
    <Button onPress={props.fbSignin} title="Facebook Login" />
    <Button onPress={props.gglSignin} title="Google Login" />

    {props.error && <Text>{props.error.message}</Text>}
  </View>
);

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Signin);
