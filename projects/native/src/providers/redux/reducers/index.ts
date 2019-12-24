import { combineReducers } from 'redux';

import user from './user';
import app from './app';
import add from './add';

export default () => combineReducers({ user, app, add });
