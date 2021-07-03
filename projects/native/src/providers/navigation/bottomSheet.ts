import { AddMenuBottomSheet } from '../../screens/AddMenuBottomSheet';
import { CreateJourneyBottomSheet } from '../../screens/CreateJourneyBottomSheet';
import { CreatePointBottomSheet } from '../../screens/CreatePointBottomSheet';
import { BottomSheetComponent, BottomSheetNavigator } from '../../typings/bottomSheet';

export enum bottomSheetComponents {
  'AddMenuBottomSheet' = 'AddMenuBottomSheet',
  'CreateJourneyBottomSheet' = 'CreateJourneyBottomSheet',
  'CreatePointBottomSheet' = 'CreatePointBottomSheet',
}

export const bottomSheetComponentsRegistry: Record<bottomSheetComponents, BottomSheetComponent> = {
  AddMenuBottomSheet,
  CreateJourneyBottomSheet,
  CreatePointBottomSheet,
};

export const allowedSnaps = [
  0,
  AddMenuBottomSheet.position,
  CreateJourneyBottomSheet.position,
  CreatePointBottomSheet.position,
];
export const calcSnapForComponent = (component: bottomSheetComponents) =>
  allowedSnaps.indexOf(bottomSheetComponentsRegistry[component].position);

let bottomSheetNavigator: BottomSheetNavigator;

export function setBottomSheetNavigator(navigatorRef: BottomSheetNavigator) {
  bottomSheetNavigator = navigatorRef;
}

export function showNativeBottomSheet(snapTo = 1) {
  setTimeout(() => bottomSheetNavigator.snapTo(snapTo), 0);
}

export const closeNativeBottomSheet = (timeout = 0) => {
  setTimeout(() => bottomSheetNavigator.snapTo(0), timeout);
};
