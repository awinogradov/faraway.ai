import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { GlobalState } from '../providers/redux/store';
import { navigate } from '../providers/redux/actions/app';
import { allowedScreens } from '../providers/navigation';

export const InitializeScreen: React.FC = () => {
  const user = useSelector((state: GlobalState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate(user.auth ? allowedScreens.App : allowedScreens.Auth));
  });

  return <Text>Initializing...</Text>;
};
