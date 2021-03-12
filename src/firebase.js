import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBCEAylO6kfdrNQ7LRjWXrGv2QaAmDiaMI",
  authDomain: "todoappsss.firebaseapp.com",
  projectId: "todoappsss",
  storageBucket: "todoappsss.appspot.com",
  messagingSenderId: "495356141343",
  appId: "1:495356141343:web:83504992ab02c1c60e1a2a",
  measurementId: "G-W8D7ZMDSWW",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);

let db = firebaseApp.firestore();

export default db;
