import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmkWRf44p0KCC1x3xkde7ceYlpr5aGQxI",
  authDomain: "last-minute-life-saver-e87d6.firebaseapp.com",
  projectId: "last-minute-life-saver-e87d6",
  storageBucket: "last-minute-life-saver-e87d6.firebasestorage.app",
  messagingSenderId: "614033338932",
  appId: "1:614033338932:web:92bfb4109a14f52d879061",
  
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();