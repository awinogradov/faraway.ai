import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { MemoryHistory } from 'history';

import user from './user';
import app from './app';
import add from './add';
import clipboard from './clipboard';

export default (history: MemoryHistory) =>
  combineReducers({ router: connectRouter(history), user, app, add, clipboard });
