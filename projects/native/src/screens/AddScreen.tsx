import React from 'react';
import { useDispatch } from 'react-redux';

import { Swing } from '../components/Swing';
import { Menu, MenuProps } from '../components/Menu';
import { allowedScreens } from '../providers/navigation';
import { navigate } from '../providers/redux/actions/app';

export const AddScreen: React.FC = () => {
  const dispatch = useDispatch();

  const provideOnPress = (destination: allowedScreens) => () => dispatch(navigate(destination));

  const mainMenu: MenuProps['items'] = [
    { title: 'Collection', onPress: provideOnPress(allowedScreens.CreateCollection) },
    { title: 'Point', onPress: provideOnPress(allowedScreens.Discovery) },
  ];

  const onClose = () => {};

  return (
    <Swing visible>
      <Menu items={mainMenu} onClose={onClose} />
    </Swing>
  );
};
