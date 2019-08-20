import { combineReducers } from 'redux';
import authReducer from './authReducer';
import pageReducer from './pageReducer';
import { firestoreReducer } from 'redux-firestore'; //made for syncing firebase data to state
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  pages: pageReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
