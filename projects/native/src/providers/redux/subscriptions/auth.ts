import auth from '@react-native-firebase/auth';
import debounce from 'lodash.debounce';

import {store} from '../store';
import {userAuthChange} from '../actions/user';

auth().onAuthStateChanged(
  debounce((user: any) => store.dispatch(userAuthChange(user)), 1000),
);
