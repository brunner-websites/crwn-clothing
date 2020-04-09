import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA5v19RM_wgaAizJLmJxN-6VlVYqWw8u0k",
  authDomain: "crwn-db-ec5cc.firebaseapp.com",
  databaseURL: "https://crwn-db-ec5cc.firebaseio.com",
  projectId: "crwn-db-ec5cc",
  storageBucket: "crwn-db-ec5cc.appspot.com",
  messagingSenderId: "381226748891",
  appId: "1:381226748891:web:65181e4a7c0eb4aef7f5fe",
  measurementId: "G-49Y0GXWQ40"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


// Google Authentication Utility Config
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;