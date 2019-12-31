import React from 'react';

import { AddBottomSheet } from '../../screens/AddBottomSheet';

import { allowedBottomSheetScreens } from '.';

interface BottomSheetNavigator {
  snapTo: (position: number) => void;
}

let bottomSheetNavigator: BottomSheetNavigator;

export function setBottomSheetNavigator(navigatorRef: typeof bottomSheetNavigator) {
  bottomSheetNavigator = navigatorRef;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bottomSheetComponentsRegistry: Record<allowedBottomSheetScreens, React.ComponentType<any>> = {
  AddBottomSheet,
};

export function showNativeBottomSheet(snapTo?: number) {
  if (bottomSheetNavigator) {
    setTimeout(() => {
      bottomSheetNavigator.snapTo(snapTo || 0);
    }, 0);
  }
}

export const closeNativeBottomSheet = () => {
  setTimeout(() => {
    bottomSheetNavigator.snapTo(1);
  }, 0);
};
