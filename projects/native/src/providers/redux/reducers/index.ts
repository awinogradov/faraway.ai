import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { MemoryHistory } from 'history';

import user from './user';
import app from './app';
import clipboard from './clipboard';

export default (history: MemoryHistory) => combineReducers({ router: connectRouter(history), user, app, clipboard });
