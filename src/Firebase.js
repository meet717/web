import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAvuIJpzLJyrlEo0iALft-ZENXufaEXZDs",
  authDomain: "meet717-4f244.firebaseapp.com",
  projectId: "meet717-4f244",
  storageBucket: "meet717-4f244.appspot.com",
  messagingSenderId: "1020433413785",
  appId: "1:1020433413785:web:d03ad1454911babc28ea08",
  measurementId: "G-QHVCT6582M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { analytics, auth, db };
