import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

export const saga = createSagaMiddleware();

export const configureStore = (preloadedState: any) => {
  const middlewares: Middleware[] = [saga];

  let debuggWrapper = (data: any) => data;
  if (__DEV__) {
    middlewares.push(createLogger());
    debuggWrapper = composeWithDevTools({ realtime: true });
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, preloadedState, debuggWrapper(compose(applyMiddleware(...middlewares))));

  return {
    store,
    persistor: persistStore(store),
  };
};
