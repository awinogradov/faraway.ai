import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';

import createRootReducer from '../reducers';

import { GlobalState } from './types';

export const saga = createSagaMiddleware();

export const configureStore = (preloadedState: GlobalState) => {
  const history = createMemoryHistory();
  const rootReducer = createRootReducer(history);
  const middlewares: Middleware[] = [routerMiddleware(history), saga];

  const composeEnhancers =
    // @ts-ignore
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
    compose;

  if (__DEV__) {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

  return {
    store,
    history,
  };
};
