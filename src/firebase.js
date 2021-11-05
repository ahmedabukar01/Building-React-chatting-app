import firebase from "firebase/app"
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyADxn41ouUhIglwlL1KQWvXR7gNQUWCo-A",
    authDomain: "unichat-cbfd8.firebaseapp.com",
    projectId: "unichat-cbfd8",
    storageBucket: "unichat-cbfd8.appspot.com",
    messagingSenderId: "1006324371983",
    appId: "1:1006324371983:web:6a8b22ae054a29d470c97a"
  }).auth();