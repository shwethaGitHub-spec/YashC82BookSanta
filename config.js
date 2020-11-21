import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAXkH3EF5d41de2ILcPhhP3zovwsy7vkY0",
  authDomain: "book-santa-5b549.firebaseapp.com",
  databaseURL: "https://book-santa-5b549.firebaseio.com",
  projectId: "book-santa-5b549",
  storageBucket: "book-santa-5b549.appspot.com",
  messagingSenderId: "63335075825",
  appId: "1:63335075825:web:e954d8e10795bd99e4be50"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();


