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
          pagesArray.push({ id: page.id, data: page.data() });
        })
      );
      dispatch(gotAllPages(pagesArray));
  } catch (err) {
    console.error(err);
  }
};

//The below will save a new page to a users page collection
export const addAPage = (userId, pageData) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection('users')
      .doc(userId)
      .collection('pages')
      .add({ pageData });
		dispatch(getAllPages(userId));
		history.push('/projects')
  } catch (err) {
    console.error(err);
  }
};

//The below will update a page that already exists in the users page collection
export const editAPage = (userId, pageId, pageData) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection('users')
      .doc(userId)
      .collection('pages')
      .doc(pageId)
      .set({ pageData });
			dispatch(getAllPages(userId));
		} catch (err) {
			console.error(err);
		}
};

export const deleteAPage = (userId, pageId) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection('users')
      .doc(userId)
      .collection('pages')
      .doc(pageId)
      .delete();
			dispatch(getAllPages(userId));
			history.push('/projects')
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
