// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLNdH78Wt3SaxV5tfbWeJ46bAC8CeW-cs",
  authDomain: "maltimart-648ca.firebaseapp.com",
  projectId: "maltimart-648ca",
  storageBucket: "maltimart-648ca.appspot.com",
  messagingSenderId: "595935336154",
  appId: "1:595935336154:web:15dce8e79e64ff0fc477e3",
  measurementId: "G-7E2XWGDNEL"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export Firestore methods
export { collection, addDoc };

export default app;
