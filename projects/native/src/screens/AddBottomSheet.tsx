import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Menu, MenuProps } from '../components/Menu';
import { allowedScreens, appNavigate } from '../providers/navigation';
import { closeBottomSheet } from '../providers/redux/actions/app';

export const AddBottomSheet: React.FC = () => {
  const dispatch = useDispatch();

  const provideOnPress = (destination: allowedScreens) => () => dispatch(appNavigate(destination));

  const mainMenu: MenuProps['items'] = [
    { title: 'Collection', onPress: provideOnPress(allowedScreens.CreateCollection) },
    { title: 'Point', onPress: provideOnPress(allowedScreens.Discovery) },
  ];

  const onClose = () => dispatch(closeBottomSheet());

  return (
    <View>
      <Menu items={mainMenu} onClose={onClose} />
    </View>
  );
};
