/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { GlobalState } from '../store/types';
import { userActionTypes, userActions } from '../actions/user';

const initialState = {
  auth: null,
  error: null,
};

export default function userReducer(state: GlobalState['user'] = initialState, action: userActions) {
  return produce(state, draft => {
    switch (action.type) {
      case userActionTypes.AUTH_CHANGE_SUCCESS:
        draft.auth = action.payload;
        break;
      case userActionTypes.AUTH_CHANGE_ERROR:
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
}
