import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {  
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD58korW7BQsghdOthBS4hYFM8ZpLjzTiE",
  authDomain: "thread-wears-db-fdd4d.firebaseapp.com",
  projectId: "thread-wears-db-fdd4d",
  storageBucket: "thread-wears-db-fdd4d.firebasestorage.app",
  messagingSenderId: "933296098905",
  appId: "1:933296098905:web:648106a68f6e6a8f5bab48"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocFromAuth = async (
  userAuth, 
  additionalInfo = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef);  

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc( userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}