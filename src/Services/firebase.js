
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCZ18sbGU7Islo0bvYcitOw8_jvMBkFYuE",
  authDomain: "localio-9421b.firebaseapp.com",
  projectId: "localio-9421b",
  storageBucket: "localio-9421b.firebasestorage.app",
  messagingSenderId: "766627880962",
  appId: "1:766627880962:web:51d60c4479e31ecb77071b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);