import { combineReducers } from 'redux';

import process from './process';
import user from './user';
import app from './app';

export default () => combineReducers({ process, user, app });
