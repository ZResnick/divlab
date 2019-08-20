import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_PAGES = 'GOT_PAGES';

/**
 * ACTION CREATORS
 */
const gotAllPages = pages => ({ type: GOT_PAGES, pages });

//THUNKS
export const getAllPages = userId => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    let pagesArray = [];
    await firestore
      .collection('users')
      .doc(userId)
      .collection('pages')
      .get()
      .then(snapshot =>
        snapshot.forEach(page => {
          console.log(page.id);
          pagesArray.push({ id: page.id, data: page.data() });
        })
      );
    if (pagesArray.length) {
      dispatch(gotAllPages(pagesArray));
    }
  } catch (err) {
    console.error(err);
  }
};

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
const pageReducer = (pageList = [], action) => {
  switch (action.type) {
    case GOT_PAGES:
      return action.pages;
    default:
      return { pages: [] };
  }
};

export default pageReducer;
