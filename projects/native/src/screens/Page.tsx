import React from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
import styled from 'styled-components/native';

import { signOut } from '../providers/firebase/auth';
import { TravelPlan } from '../components/TravelPlan';

const StyledView = styled.View`
  padding: 40px 0 0 20px;
  background: #fff;
`;

const Page: React.FC = props => {
  return (
    <StyledView>
      <View style={{ paddingTop: 100 }}>
        <Text>Welcome {props.user.auth.email}</Text>
        <Button onPress={signOut} title="Logout" />
      </View>
      <TravelPlan />
    </StyledView>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Page);
