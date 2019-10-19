import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { View, Button, Text } from 'react-native';
import styled from 'styled-components/native';

import { userSignout } from '../providers/redux/actions/user';
import { TravelPlan } from '../components/TravelPlan';

const StyledView = styled.View`
  padding: 40px 0 0 20px;
  background: #fff;
`;

const mapStateToProps = state => ({ user: state.user });
const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators({ signout: userSignout }, dispatch);

export type RootScreenProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>;

const Root: React.FC<RootScreenProps> = props => {
  return (
    <StyledView>
      <View style={{ paddingTop: 100 }}>
        <Text>Welcome {props.user.auth.email}</Text>
        <Button onPress={props.signout} title="Logout" />
      </View>
      <TravelPlan />
    </StyledView>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchProps,
)(Root);
