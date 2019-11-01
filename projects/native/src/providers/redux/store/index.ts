import auth from '@react-native-firebase/auth';
import { AppState } from 'react-native';

import rootSaga from '../sagas';

import { configureStore, saga } from './configure';
import { GlobalState } from './types';

const intitalState: GlobalState = {
  user: {
    auth: auth().currentUser,
  },
  app: {
    state: AppState.currentState,
  },
  clipboard: {
    content: undefined,
  },
  add: {
    visible: false,
  },
};

export const { store, history } = configureStore(intitalState);

saga.run(rootSaga);

export * from './types';
