import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyD3K0JMbSxEsndNz6fEF-B018jtIAdmMBE",
    authDomain: "chat-app-82f7d.firebaseapp.com",
    projectId: "chat-app-82f7d",
    storageBucket: "chat-app-82f7d.appspot.com",
    messagingSenderId: "525909206033",
    appId: "1:525909206033:web:669ececf8a4bf96b52bdb0",
  })
  .auth();
