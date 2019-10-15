import {AppState} from 'react-native';
import {produce} from 'immer';

import {GlobalState} from '../store/types';
import {appActionTypes, AppActions} from '../actions/app';

const initialState = {
  state: AppState.currentState,
};

export default function appReducer(
  state: GlobalState['app'] = initialState,
  action: AppActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case appActionTypes.STATE_CHANGE:
        draft.state = action.payload;
        break;
    }
  });
}
