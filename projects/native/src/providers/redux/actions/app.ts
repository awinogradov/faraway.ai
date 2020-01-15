import { AppStateStatus } from 'react-native';

import { appActionTypes } from '../constants/app';
import { createAction, createEmptyAction } from '../../../utils/actionCreator';
import { allowedScreens } from '../../navigation';
import { GlobalState } from '../store';

export const stateChange = (state: AppStateStatus) => createAction(appActionTypes.STATE_CHANGE, state);
export const stateActive = () => createEmptyAction(appActionTypes.STATE_ACTIVE);

export const navigate = (screen: allowedScreens) => createAction(appActionTypes.NAVIGATE, screen);

export interface ShowBottomSheetProps {
  component: GlobalState['app']['bottomSheet']['component'];
  snapTo?: number;
}
export const showBottomSheet = (props: ShowBottomSheetProps) => createAction(appActionTypes.SHOW_BOTTOM_SHEET, props);
export const setBottomSheetComponent = (component: ShowBottomSheetProps['component']) =>
  createAction(appActionTypes.SET_BOTTOM_SHEET_COMPONENT, component);
export const closeBottomSheet = (timeout?: number) => createAction(appActionTypes.CLOSE_BOTTOM_SHEET, timeout);

export const showTabs = () => createEmptyAction(appActionTypes.SHOW_TABS);
export const closeTabs = () => createEmptyAction(appActionTypes.CLOSE_TABS);

export const clipboardRead = (clipboardContent: string) =>
  createAction(appActionTypes.CLIPBOARD_READ, clipboardContent);
export const clipboardWrite = (clipboardContent: string) =>
  createAction(appActionTypes.CLIPBOARD_WRITE, clipboardContent);
