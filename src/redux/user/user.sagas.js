import { takeLatest, put, all, call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, createOrRetrieveUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions';



// 'sign-in' function
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createOrRetrieveUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// Sign in with Google Functions
export function* signInWithGoogle() {
  try {
    const { userAuth } = yield auth.signInWithPopup(googleProvider);

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield (put(signInFailure(error)));
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

    yield getSnapshotFromUserAuth(user);

  } catch (error) {
    yield put(signInFailure(error.message));
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

    // const userRef = yield call(createOrRetrieveUserProfileDocument, userAuth);
    // const userSnapshot = yield userRef.get();
    // yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error))
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


// sign-up sagas
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createOrRetrieveUserProfileDocument(user, { displayName });
    alert("successfully signed up");
    yield put(signUpSuccess({ user, additionalData: { displayName } }));

  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onSignUpSuccess({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* listenForUserSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* listenForUserSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, onSignUpSuccess);
}




export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(listenForEmailSignInStart),
    call(listenForCheckUserSession),
    call(listenForUserSignOout),
    call(listenForUserSignUp),
    call(listenForUserSignUpSuccess)
  ]);
};


