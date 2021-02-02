const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

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

const auth = firebase.auth();
const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

module.exports = {
  auth,
  firestore,
  googleProvider,
};
