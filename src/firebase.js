import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: "where-2-watch-d7e26.firebaseapp.com",
    projectId: "where-2-watch-d7e26",
    storageBucket: "where-2-watch-d7e26.appspot.com",
    messagingSenderId: "1037477701398",
    appId: "1:1037477701398:web:d5279e3b415df7c4049237"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
