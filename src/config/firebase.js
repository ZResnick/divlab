import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyCPJmgQbIzMysRR6_rwauUL_9TTGrpm9Xw',
  authDomain: 'divlab.firebaseapp.com',
  databaseURL: 'https://divlab.firebaseio.com',
  projectId: 'divlab',
  storageBucket: 'divlab.appspot.com',
  messagingSenderId: '919221202248',
  appId: '1:919221202248:web:ffb4df2748747841',
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
