import history from '../history';

//inital state
const initState = {
  authError: null,
};

//constants
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

//actions
const loginError = error => ({ type: LOGIN_ERROR, error });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS });
const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS });
const signUpError = err => ({ type: SIGN_UP_ERROR, err });

//THUNKS
export const signIn = credentials => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = await getFirebase(); //this is the call that gets us access to firebase:
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    dispatch(loginSuccess());
    history.push('/projects');
  } catch (err) {
    dispatch(loginError(err));
    console.error(err);
  }
};

export const signOut = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = await getFirebase();
    await firebase.auth().signOut();
    dispatch(signOutSuccess());
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

export const signUp = newUser => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = await getFirebase();
    const firestore = await getFirestore();
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    await firestore
      .collection('users')
      .doc(response.user.uid)
      .set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `<${newUser.firstName[0]}${newUser.lastName[0]} />`,
      });
    dispatch(signUpSuccess());
    history.push('/');
  } catch (err) {
    dispatch(signUpError(err));
    console.error(err);
  }
};

//Reducer
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log('login error');
      return {
        ...state,
        authError:
          'Login failed.  Please check your credentials and try again.',
      };
    case LOGIN_SUCCESS:
      console.log('Login successful');
      return { ...state, authError: null };
    case SIGN_OUT_SUCCESS:
      console.log('Sign Out Success!');
      return state;
    case SIGN_UP_SUCCESS:
      console.log('Sign Up Success!');
      return { ...state, authError: null };
    case SIGN_UP_ERROR:
      console.log('Sign Up Failed');
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};

export default authReducer;
