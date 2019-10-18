import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

import { createFbSignin, createGglSignin } from '../providers/firebase/auth';

export default function Signin() {
  const [error, setError] = useState<Error>();

  const fbSignin = createFbSignin(setError);
  const gglSignin = createGglSignin(setError);

  return (
    <View style={{ paddingTop: 100 }}>
      <Button onPress={fbSignin} title="Facebook Login" />
      <Button onPress={gglSignin} title="Google Login" />
      {error && <Text>{error.message}</Text>}
    </View>
  );
}
