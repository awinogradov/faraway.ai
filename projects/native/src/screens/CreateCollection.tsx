import React from 'react';
import { Text } from 'react-native';

import { Swing } from '../components/Swing';
// import { useDispatch } from 'react-redux';

// import { allowedScreens } from '../providers/navigation/allowed';
// import { navigate, dismissModals } from '../providers/redux/actions/app';

export const CreateCollectionScreen: React.FC = () => {
  // const dispatch = useDispatch();

  // const provideOnPress = (destination: allowedScreens) => () => dispatch(navigate(destination));

  // const onClose = () => dispatch(dismissModals());

  return (
    <Swing visible>
      <Text>Collection</Text>
    </Swing>
  );
};
