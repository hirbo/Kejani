// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpqNHmjQ_7niYdd_NzEPf0NwIDFB9sfAo",
  authDomain: "kejani-ed433.firebaseapp.com",
  projectId: "kejani-ed433",
  storageBucket: "kejani-ed433.appspot.com",
  messagingSenderId: "484354461308",
  appId: "1:484354461308:web:278f1fbb4e5d91a49743f9",
  measurementId: "G-1WBEZ2LPLF"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
const auth =getAuth(app);
const analytics = getAnalytics(app);