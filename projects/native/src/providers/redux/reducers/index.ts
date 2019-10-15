import {combineReducers} from 'redux';

import user from './user';
import app from './app';
import clipboard from './clipboard';

export default combineReducers({user, app, clipboard});
