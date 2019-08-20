import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseConfig from './config/firebase';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {
      useFirestoreForProfile: true, //this allows us to access the user profile on state
      userProfile: 'users',
    })
  )
);

//EXPLAINING THE ABOVE CREATESTORE
//that withExtraArgument({ getFirebase, getFirestore })) allows you to add getFirebase or getFirestore to arguments passed to each thunk, see the reducers.
//To get these to work though, we must make them aware of our firestore using a store enhancer...
//Import compose from redux and put the applymiddelware into that as composes first argument, import reduxFirestore and reactReduxFirebase add these to compose as well, then lastly pass the firestore config to those so that when we use getFirestore and getFirebase, they know about the store.

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
