import React from 'react';

import { AddMenuBottomSheet } from '../../screens/AddMenuBottomSheet';
import { CreateCollectionBottomSheet } from '../../screens/CreateCollectionBottomSheet';

const bottomSheetPositions = {
  closed: 0,
  addMenu: 270,
  createCollection: 320,
};

export const bottomSheetSnapPoints = Object.values(bottomSheetPositions);

export const allowedBottomSheetSnaps = {
  closed: 0,
  addMenu: 1,
  createCollection: 2,
};

export enum allowedBottomSheetScreens {
  AddMenu = 'AddMenuBottomSheet',
  CreateCollection = 'CreateCollectionBottomSheet',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bottomSheetComponentsRegistry: Record<allowedBottomSheetScreens, React.ComponentType<any>> = {
  AddMenuBottomSheet,
  CreateCollectionBottomSheet,
};

interface BottomSheetNavigator {
  snapTo: (position: number) => void;
}

let bottomSheetNavigator: BottomSheetNavigator;

export function setBottomSheetNavigator(navigatorRef: typeof bottomSheetNavigator) {
  bottomSheetNavigator = navigatorRef;
}

export function showNativeBottomSheet(snapTo: number) {
  setTimeout(() => {
    bottomSheetNavigator.snapTo(snapTo);
  }, 0);
}

export const closeNativeBottomSheet = () => {
  setTimeout(() => {
    bottomSheetNavigator.snapTo(bottomSheetPositions.closed);
  }, 0);
};
