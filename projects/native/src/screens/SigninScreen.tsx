import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Button, Text } from 'react-native';

import { userFbSignin, userGglSignin } from '../providers/redux/actions/user';
import { GlobalState } from '../providers/redux/store';

export const SigninScreen: React.FC = () => {
  const error = useSelector((state: GlobalState) => state.user.error);
  const dispatch = useDispatch();
  const fbSignin = useCallback(() => dispatch(userFbSignin()), [dispatch]);
  const gglSignin = useCallback(() => dispatch(userGglSignin()), [dispatch]);

  return (
    <View style={{ paddingTop: 100 }}>
      <Button onPress={fbSignin} title="Facebook Login" />
      <Button onPress={gglSignin} title="Google Login" />

      {error && <Text>{error.message}</Text>}
    </View>
  );
};
