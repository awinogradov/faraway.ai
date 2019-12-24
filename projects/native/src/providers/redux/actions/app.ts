import { AppStateStatus } from 'react-native';

import { appActionTypes } from '../constants/app';
import { createAction, createEmptyAction } from '../../../utils/actionCreator';
import { allowedScreens } from '../../navigation';

export const stateChange = (state: AppStateStatus) => createAction(appActionTypes.STATE_CHANGE, state);
export const stateActive = () => createEmptyAction(appActionTypes.STATE_ACTIVE);

export const navigate = (currentScreen: allowedScreens) => createAction(appActionTypes.NAVIGATE, currentScreen);

export const clipboardRead = (clipboardContent: string) =>
  createAction(appActionTypes.CLIPBOARD_READ, clipboardContent);
export const clipboardWrite = (clipboardContent: string) =>
  createAction(appActionTypes.CLIPBOARD_WRITE, clipboardContent);
