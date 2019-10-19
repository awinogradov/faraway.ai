/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { GlobalState } from '../store/types';
import { userActionTypes, userActions } from '../actions/user';

const initialState = {
  auth: null,
};

export default function userReducer(state: GlobalState['user'] = initialState, action: userActions) {
  return produce(state, draft => {
    switch (action.type) {
      case userActionTypes.AUTH_CHANGE:
        draft.auth = action.payload;
        break;
      default:
        break;
    }
  });
}
