import { UserActionTypes } from './user.types'

export const setCurrentUser = user => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
  }
}

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