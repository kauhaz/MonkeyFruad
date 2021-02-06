import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYA2ff6qoLT2HpKZFJbqfD83tLxj41t_I",
  authDomain: "monkeyfruad-54aff.firebaseapp.com",
  projectId: "monkeyfruad-54aff",
  storageBucket: "monkeyfruad-54aff.appspot.com",
  messagingSenderId: "669620808451",
  appId: "1:669620808451:web:1b7bc9a0d769a9028e5736"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
export const auth = firebase.auth();
export const authcredentail = firebase.auth;
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;

