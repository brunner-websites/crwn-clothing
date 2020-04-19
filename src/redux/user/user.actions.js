import { UserActionTypes } from './user.types'

// Google Sign-In Actions
export const googleSignInStart = () => {
  return {
    type: UserActionTypes.GOOGLE_SIGN_IN_START
  }
}

export const googleSignInSuccess = user => {
  return {
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
  }
}

export const googleSignInFailure = error => {
  return {
    type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error.message
  }
}


// Email Sign-In Actions
export const emailSignInStart = emailAndPassword => {
  return {
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
  }
}

export const emailSignInSuccess = user => {
  return {
    type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
  }
}

export const emailSignInFailure = error => {
  return {
    type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error.message
  }
}


//
export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
})


// sign out actions
export const signOutStart = () => {
  return {
    type: UserActionTypes.SIGN_OUT_START
  }
}

export const signOutSuccess = () => {
  return {
    type: UserActionTypes.SIGN_OUT_SUCCESS
  }
}

export const signOutFailure = error => {
  return {
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error.message
  }
}