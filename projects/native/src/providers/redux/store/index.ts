import auth from '@react-native-firebase/auth';
import {AppState} from 'react-native';

import {extractUser} from '../actions/user';

import {configureStore, saga} from './configure';
import rootSaga from '../sagas';
import {GlobalState} from './types';

const intitalState: GlobalState = {
  user: {
    auth: extractUser(auth().currentUser),
  },
  app: {
    state: AppState.currentState,
  },
  clipboard: {
    content: undefined,
  },
};

export const {store, persistor} = configureStore(intitalState);

saga.run(rootSaga);

export * from './types';
