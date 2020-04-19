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
      // use the query reference to save the actual data into the db
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(object => {
    const newDocRef = collectionRef.doc();

    batch.set(newDocRef, object);

  });

  return await batch.commit();
}


export const convertCollectionSnapshotToMap = collections => {

  // .docs() gets QuerySnapshotArray
  const transformedCollections = collections.docs.map(doc => {

    // .data() gets the actual data
    const { title, items } = doc.data();

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items
    }
  })

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator;
  }, {});
}


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


// Google Authentication Utility Config
export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


export default firebase;