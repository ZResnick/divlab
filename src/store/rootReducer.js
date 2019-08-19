import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; //made for syncing firebase data to state

const rootReducer = combineReducers({
  firestore: firestoreReducer,
});

export default rootReducer;
