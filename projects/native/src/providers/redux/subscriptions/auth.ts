import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import debounce from 'lodash.debounce';

import { store } from '../store';
import { userAuthChange } from '../actions/user';

auth().onAuthStateChanged(debounce((user: FirebaseAuthTypes.User) => store.dispatch(userAuthChange(user)), 1000));
