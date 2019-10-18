/* eslint-disable no-param-reassign */
import { produce } from 'immer';

import { GlobalState } from '../store/types';
import { clipboardActionTypes, ClipboardActions } from '../actions/clipboard';

const initialState = {
  content: undefined,
};

export default function clipboardReducer(state: GlobalState['clipboard'] = initialState, action: ClipboardActions) {
  return produce(state, draft => {
    switch (action.type) {
      case clipboardActionTypes.CONTENT_WRITE:
        draft.content = action.payload;
        break;
      default:
        break;
    }
  });
}
