// import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';
import { routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';

import createRootReducer from '../reducers';

import { GlobalState } from './types';

export const saga = createSagaMiddleware();

export const configureStore = (preloadedState: GlobalState) => {
  const history = createMemoryHistory();
  const rootReducer = createRootReducer(history);
  const middlewares: Middleware[] = [routerMiddleware(history), saga];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let debuggWrapper = (data: any) => data;
  if (__DEV__) {
    middlewares.push(createLogger());
    debuggWrapper = composeWithDevTools({ realtime: true });
  }

  const store = createStore(rootReducer, preloadedState, debuggWrapper(compose(applyMiddleware(...middlewares))));

  return {
    store,
    history,
  };
};
