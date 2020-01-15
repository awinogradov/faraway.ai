/* eslint-disable no-param-reassign */
import { AppState } from 'react-native';
import { produce } from 'immer';

import { GlobalState } from '../../../typings/state';
import { appActionTypes } from '../constants/app';
import * as appActions from '../actions/app';
import { allowedScreens } from '../../navigation';
import { ActionTypes } from '../../../utils/actionTypes';

const initialState: GlobalState['app'] = {
  state: AppState.currentState,
  currentScreen: allowedScreens.Initialize,
  tabs: {
    visible: true,
  },
  bottomSheet: {
    visible: false,
    component: null,
  },
};

export default function appReducer(
  state: GlobalState['app'] = initialState,
  action: ReturnType<ActionTypes<typeof appActions>>,
) {
  return produce(state, draft => {
    switch (action.type) {
      case appActionTypes.STATE_CHANGE:
        draft.state = action.payload;
        break;
      case appActionTypes.CLIPBOARD_WRITE:
        draft.clipboard = action.payload;
        break;
      case appActionTypes.NAVIGATE:
        draft.currentScreen = action.payload;
        break;
      case appActionTypes.SHOW_BOTTOM_SHEET:
        draft.bottomSheet.visible = true;
        break;
      case appActionTypes.SET_BOTTOM_SHEET_COMPONENT:
        draft.bottomSheet.component = action.payload;
        break;
      case appActionTypes.CLOSE_BOTTOM_SHEET:
        draft.bottomSheet.visible = false;
        break;
      case appActionTypes.SHOW_TABS:
        draft.tabs.visible = true;
        break;
      case appActionTypes.CLOSE_TABS:
        draft.tabs.visible = false;
        break;
      default:
        break;
    }
  });
}
