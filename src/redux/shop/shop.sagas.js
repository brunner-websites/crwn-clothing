// takeEvery listens for every action for a specific type that we pass to it
import { takeLatest, call, put } from 'redux-saga/effects'
import ShopActionTypes from './shop.types'

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from '../shop/shop.actions';

export function* fetchCollectionsAsync() {

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);

    // 'put' is the sagas way of dispatching an action to the reducer
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}