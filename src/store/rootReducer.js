import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { firestoreReducer } from 'redux-firestore'; //made for syncing firebase data to state
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
