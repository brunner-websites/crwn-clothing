import ShopActionTypes from './shop.types';

//import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
  }
}

export const fetchCollectionsSuccess = collectionsMap => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
  }
}

export const fetchCollectionsFailure = error => {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: error
  }
}

// saga-fied -> this is now handled in the shop.sagas file
/*
export const fetchCollectionsStartAsync = () => {
  return dispatch => {

    const collectionRef = firestore.collection('collections');

    dispatch(fetchCollectionsStart);

    collectionRef.get()
      .then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => {
        dispatch(fetchCollectionsFailure(error.message));
      });
  }
}
*/