// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn91XcvBJucYal8zE5ndVM6pOpiaUN3_4",
  authDomain: "expense-tracker-66c0b.firebaseapp.com",
  projectId: "expense-tracker-66c0b",
  storageBucket: "expense-tracker-66c0b.appspot.com",
  messagingSenderId: "511327446854",
  appId: "1:511327446854:web:2f1fa18e775c3a862aa747",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const currentCollection = "transactionsTEST";

//firebase login
//firebase init
//firebase deploy
