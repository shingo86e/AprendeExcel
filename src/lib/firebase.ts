// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdhbYxjcF16YczuOcCq6zRoyFL-7-qiuA",
  authDomain: "aprendeexcel-1501a.firebaseapp.com",
  projectId: "aprendeexcel-1501a",
  storageBucket: "aprendeexcel-1501a.firebasestorage.app",
  messagingSenderId: "65340408845",
  appId: "1:65340408845:web:aee6f8df63b0294eeec144",
  measurementId: "G-D0Z25H7NK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics only on client-side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;