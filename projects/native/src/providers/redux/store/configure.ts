/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from '../reducers';

export const saga = createSagaMiddleware();

export const configureStore = () => {
  const rootReducer = createRootReducer();
  const middlewares: Middleware[] = [saga];

  const composeEnhancers =
    // @ts-ignore
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
    compose;

  if (__DEV__) {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

  return {
    store,
  };
};
