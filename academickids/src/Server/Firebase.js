// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoNp_hw4bVkbNFBk_oOKBH1N-MqErZONU",
  authDomain: "academickids.firebaseapp.com",
  databaseURL: "https://academickids-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "academickids",
  storageBucket: "academickids.appspot.com",
  messagingSenderId: "528001565143",
  appId: "1:528001565143:web:1140a1e163f402cbf04b92",
  measurementId: "G-JG3DX6LY9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics, getDatabase, ref, push };
