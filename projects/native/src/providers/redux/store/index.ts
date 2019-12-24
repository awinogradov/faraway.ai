import rootSaga from '../sagas';

import { configureStore, saga } from './configure';

export const { store } = configureStore();

saga.run(rootSaga);

export * from './types';
