import { AddMenuBottomSheet } from '../../screens/AddMenuBottomSheet';
import { CreateJourneyBottomSheet } from '../../screens/CreateJourneyBottomSheet';

export const bottomSheetComponentsRegistry = {
  AddMenuBottomSheet,
  CreateJourneyBottomSheet,
};

export const allowedSnaps = [0, AddMenuBottomSheet.position, CreateJourneyBottomSheet.position];
export const calcSnapForComponent = (component: keyof typeof bottomSheetComponentsRegistry | null) => {
  if (!component) return 0;

  return allowedSnaps.indexOf(bottomSheetComponentsRegistry[component].position);
};

type BottomSheetComponents = {
  [key in keyof typeof bottomSheetComponentsRegistry]: keyof typeof bottomSheetComponentsRegistry;
};

export const bottomSheetComponents: BottomSheetComponents = Object.keys(bottomSheetComponentsRegistry).reduce(
  (acc: BottomSheetComponents, key) => {
    // @ts-ignore
    acc[key] = key;
    return acc;
  },
  {} as BottomSheetComponents,
);

interface BottomSheetNavigator {
  snapTo: (position: number) => void;
}

let bottomSheetNavigator: BottomSheetNavigator;

export function setBottomSheetNavigator(navigatorRef: typeof bottomSheetNavigator) {
  bottomSheetNavigator = navigatorRef;
}

export function showNativeBottomSheet(snapTo = 1) {
  setTimeout(() => bottomSheetNavigator.snapTo(snapTo), 0);
}

export const closeNativeBottomSheet = (timeout = 0) => {
  setTimeout(() => bottomSheetNavigator.snapTo(0), timeout);
};
