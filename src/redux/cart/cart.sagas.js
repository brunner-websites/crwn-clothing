import { UserActionTypes } from '../user/user.types'
import { clearCart } from './cart.actions';

import { all, call, takeLatest, put } from 'redux-saga/effects';


export function* clearCartOnSignOut() {

  yield put(clearCart());

}

export function* listenForSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS)
}

export function* cartSagas() {
  yield all([
    call(listenForSignOutSuccess)
  ]);
};


