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

export const createOrRetrieveUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  // userRef is a QueryReference
  // get the user reference with his 'uid' in the users collection in the firebase db
  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  // snapshot is a QuerySnapshot
  // use the get() method to retrieve the (query) snapshot (this can be used to see if data exists)
  const snapshop = await userRef.get();

  // if the user doesn't exist yet e.g. no data exists where the shapshot is pointing to, 
  // save the authenticated user into the db
  if (!snapshop.exists) {

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // use the query reference to save the actualy data into the db
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}

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