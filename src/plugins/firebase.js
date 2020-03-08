import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// if(!firebase.app.length) {
var firebaseConfig = {
  apiKey: "AIzaSyDJNH1wRLfBFygu8HXxrFgwagzEV8PVIvQ",
  authDomain: "mytask-6349b.firebaseapp.com",
  databaseURL: "https://mytask-6349b.firebaseio.com",
  projectId: "mytask-6349b",
  storageBucket: "mytask-6349b.appspot.com",
  messagingSenderId: "364179269082",
  appId: "1:364179269082:web:41366f6e3babcfbea00ce3",
  measurementId: "G-QETZET3RYL"
};
firebase.initializeApp(firebaseConfig);
// }

var db = firebase.firestore();
export { firebase, db };
