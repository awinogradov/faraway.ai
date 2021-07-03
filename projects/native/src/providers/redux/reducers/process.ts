/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { ActionTypes } from '../../../utils/actionTypes';
import { GlobalState } from '../../../typings/state';
import { processActionTypes } from '../constants/process';
import * as processActions from '../actions/process';

const initialState = {};

export default function userReducer(
  state: GlobalState['process'] = initialState,
  action: ReturnType<ActionTypes<typeof processActions>>,
) {
  return produce(state, draft => {
    switch (action.type) {
      case processActionTypes.EMIT_PROCESS:
        draft[action.payload] = {
          inProgress: true,
        };
        break;
      case processActionTypes.PROCESS_SUCCESS:
        draft[action.payload.key] = {
          inProgress: false,
          isSuccess: true,
          value: action.payload.value,
        };
        break;
      case processActionTypes.PROCESS_ERROR:
        draft[action.payload.key] = {
          inProgress: false,
          isSuccess: false,
          error: action.payload.error,
        };
        break;
      case processActionTypes.DELETE_PROCESS:
        draft[action.payload] = undefined;
        break;
      default:
        break;
    }
  });
}
