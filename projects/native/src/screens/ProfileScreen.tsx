import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Text } from 'react-native';

import { userSignout } from '../providers/redux/actions/user';
import { MainScreenView } from '../containers/MainScreenView';
import { GlobalState } from '../providers/redux/store';

export const ProfileScreen: React.FC = () => {
  const user = useSelector((state: GlobalState) => state.user);
  const dispatch = useDispatch();

  return (
    <MainScreenView>
      <Text>Welcome {user.auth.email}</Text>

      <Button onPress={() => dispatch(userSignout())} title="Logout" />
    </MainScreenView>
  );
};
