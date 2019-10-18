import { AppState } from 'react-native';

import { store } from '../store';
import { stateChange, stateActive } from '../actions/app';

AppState.addEventListener('change', state => {
  store.dispatch(stateChange(state));

  if (state === 'active') {
    store.dispatch(stateActive());
  }
});
