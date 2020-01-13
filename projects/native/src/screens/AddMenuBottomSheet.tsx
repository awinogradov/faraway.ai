import React from 'react';
import { useDispatch } from 'react-redux';

import { Menu, MenuProps } from '../components/Menu';
import { BottomSheetMenuScreen } from '../components/BottomSheetMenuScreen';
import { BottomSheetActions } from '../components/BottomSheetActions';
import { BottomSheetClose } from '../components/BottomSheetClose';
import {
  allowedScreens,
  appNavigate,
  allowedBottomSheetScreens,
  allowedBottomSheetSnaps,
} from '../providers/navigation';
import { closeBottomSheet, showBottomSheet } from '../providers/redux/actions/app';

export const AddMenuBottomSheet: React.FC = () => {
  const dispatch = useDispatch();
  const provideOnPress = (destination: allowedScreens) => () => dispatch(appNavigate(destination));

  const mainMenu: MenuProps['items'] = [
    {
      title: 'Journey',
      onPress: () => {
        dispatch(
          showBottomSheet({
            snapTo: allowedBottomSheetSnaps.createCollection,
            component: allowedBottomSheetScreens.CreateCollection,
          }),
        );
      },
    },
    { title: 'Point', onPress: provideOnPress(allowedScreens.Discovery) },
  ];

  const onClose = () => dispatch(closeBottomSheet());

  return (
    <BottomSheetMenuScreen>
      <Menu items={mainMenu} />

      <BottomSheetActions>
        <BottomSheetClose onPress={onClose} />
      </BottomSheetActions>
    </BottomSheetMenuScreen>
  );
};
