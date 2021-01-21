import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3KcgB9-6ztO8RH6mfwUZSZ1wwn2pPYQc",
  authDomain: "monkeyfruad.firebaseapp.com",
  projectId: "monkeyfruad",
  storageBucket: "monkeyfruad.appspot.com",
  messagingSenderId: "726555330449",
  appId: "1:726555330449:web:ac01442745fea036233c30",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;

