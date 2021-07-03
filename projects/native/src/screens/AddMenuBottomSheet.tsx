import React from 'react';
import { useDispatch } from 'react-redux';

import { Menu, MenuProps } from '../components/Menu';
import { BottomSheetMenuScreen } from '../components/BottomSheetMenuScreen';
import { BottomSheetActions } from '../components/BottomSheetActions';
import { BottomSheetClose } from '../components/BottomSheetClose';
import { bottomSheetComponents } from '../providers/navigation';
import { closeBottomSheet, showBottomSheet } from '../providers/redux/actions/app';
import { BottomSheetComponent } from '../typings/bottomSheet';

export const AddMenuBottomSheet: BottomSheetComponent = () => {
  const dispatch = useDispatch();
  const mainMenu: MenuProps['items'] = [
    {
      title: 'Journey',
      onPress: () => {
        dispatch(
          showBottomSheet({
            component: bottomSheetComponents.CreateJourneyBottomSheet,
          }),
        );
      },
    },
    {
      title: 'Point',
      onPress: () => {
        dispatch(
          showBottomSheet({
            component: bottomSheetComponents.CreatePointBottomSheet,
          }),
        );
      },
    },
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

AddMenuBottomSheet.position = 270;
