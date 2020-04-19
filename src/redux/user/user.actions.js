import { UserActionTypes } from './user.types'

// Generic Sign-In Actions
export const signInStart = () => {
  return {
    type: UserActionTypes.GOOGLE_SIGN_IN_START
  }
}

export const signInSuccess = user => {
  return {
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
  }
}

export const signInFailure = error => {
  return {
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error.message
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


// sign up actions
export const signUpStart = newUserInfo => {
  return {
    type: UserActionTypes.SIGN_UP_START,
    payload: newUserInfo
  }
}

export const signUpSuccess = ({ user, additionalData }) => {
  return {
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
  }
}

export const signUpFailure = error => {
  return {
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error.message
  }
}