/* eslint-disable no-param-reassign */
import auth from '@react-native-firebase/auth';
import { produce } from 'immer';

import { ActionTypes } from '../../../utils/actionTypes';
import { GlobalState } from '../store/types';
import { userActionTypes } from '../constants/user';
import * as userActions from '../actions/user';

const initialState = {
  auth: auth().currentUser || undefined,
};

export default function userReducer(
  state: GlobalState['user'] = initialState,
  action: ReturnType<ActionTypes<typeof userActions>>,
) {
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
