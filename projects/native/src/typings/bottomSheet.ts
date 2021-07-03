import { FC } from 'react';

export interface BottomSheetNavigator {
  snapTo: (position: number) => void;
}

export interface BottomSheetComponent extends FC {
  position: number;
}
