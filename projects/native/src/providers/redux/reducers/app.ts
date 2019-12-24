/* eslint-disable no-param-reassign */
import { AppState } from 'react-native';
import { produce } from 'immer';

import { GlobalState } from '../store/types';
import { appActionTypes } from '../constants/app';
import * as appActions from '../actions/app';
import { allowedScreens } from '../../navigation';
import { ActionTypes } from '../../../utils/actionTypes';

const initialState = {
  state: AppState.currentState,
  currentScreen: allowedScreens.Initialize,
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
      default:
        break;
    }
  });
}
