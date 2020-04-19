import { takeLatest, put, all, call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, createOrRetrieveUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import {
  googleSignInSuccess,
  googleSignInFailure,
  emailSignInSuccess,
  emailSignInFailure,
  signOutSuccess,
  signOutFailure
} from './user.actions';


// Sign in with Google Functions
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createOrRetrieveUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield (put(googleSignInFailure(error)));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


// Sign-In with Email functions

// This functions receives the action object from the EMAIL_SIGN_IN_START action as input
export function* signInWithEmail({ payload: { email, password } }) {

  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(createOrRetrieveUserProfileDocument, user);
    const userSnapshot = yield userRef.get();

    // put does the same as dispatch
    yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

  } catch (error) {
    yield put(emailSignInFailure(error.message));
  }
}

export function* listenForEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}



// check user session
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();

    if (!userAuth) return;

    const userRef = yield call(createOrRetrieveUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(emailSignInFailure(error))
  }
}

export function* listenForCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


// sign out sages
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* listenForUserSignOout() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}




export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(listenForEmailSignInStart),
    call(listenForCheckUserSession),
    call(listenForUserSignOout)
  ]);
};


