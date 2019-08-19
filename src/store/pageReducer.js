import history from '../history';

//THUNKS
export const addAPage = page => async (
  dispatch,
  getState, //the firestore functions on line 38 WILL NOT WORK WITHOUT THIS GETSTATE!!!
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore(); //this is the call that gets us access to firestore:
    //gets us a reference to the Songs Collection and then adds a document using .add({document })
    await firestore.collection('pages').add({ ...page });
    // history.push('/');
  } catch (err) {
    console.error(err);
  }
};

//we need a default export but can exdport as many thunks as we want.
export default addAPage;
