/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { GlobalState } from '../store/types';
import { addActionTypes, AddActions } from '../actions/add';

const initialState = {
  visible: false,
};

export default function appReducer(state: GlobalState['add'] = initialState, action: AddActions) {
  return produce(state, draft => {
    switch (action.type) {
      case addActionTypes.VISIBILITY_CHANGE:
        draft.visible = action.payload.visible;
        draft.kind = action.payload.kind;
        draft.data = action.payload.data;
        break;
      case addActionTypes.ADD_POINT_SUCCESS:
        draft.visible = false;
        draft.kind = undefined;
        draft.data = undefined;
        break;
      case addActionTypes.LOAD_POINT_DESCRIPTION_SUCCESS:
        draft.desciption = action.payload;
        break;
      default:
        break;
    }
  });
}
