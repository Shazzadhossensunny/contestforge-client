import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQm6N07Upk9aKItYZNhbcsjitD7uoYEsc",
  authDomain: "contestforge.firebaseapp.com",
  projectId: "contestforge",
  storageBucket: "contestforge.appspot.com",
  messagingSenderId: "1090806175936",
  appId: "1:1090806175936:web:1feb61e1566a7ff8a0f525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;