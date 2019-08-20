import history from '../history';

//inital state
const initState = {
  authError: null,
};

//constants
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

//actions
const loginError = error => ({ type: LOGIN_ERROR, error });
const loginSuccess = () => ({ type: LOGIN_SUCCESS });
const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS });

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
    history.push('/divlab');
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
    history.push('/');
    dispatch(signOutSuccess());
  } catch (err) {
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
    default:
      return state;
  }
};

export default authReducer;
