// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXeT4ypguGeKcvy-SpwNhNp8L17rKj1Hw",
  authDomain: "internarea-c75b8.firebaseapp.com",
  projectId: "internarea-c75b8",
  storageBucket: "internarea-c75b8.firebasestorage.app",
  messagingSenderId: "945801955307",
  appId: "1:945801955307:web:9b779a0503be3817dffbae",
  measurementId: "G-01THZDZQ8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};