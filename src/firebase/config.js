// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyA80j04C2sPCDfiN6cZfwUq_EYJLy_w0CY",
  authDomain: "lms-learningmanagementsyte.firebaseapp.com",
  projectId: "lms-learningmanagementsyte",
  // storageBucket: "lms-learningmanagementsyte.firebasestorage.app",
  storageBucket: "lms-learningmanagementsyte.appspot.com",
  messagingSenderId: "360800483688",
  appId: "1:360800483688:web:81b6d1fedbf928a398fedd",
  measurementId: "G-HKWVMWN5CH"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Nếu chạy local, bật emulator
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "localhost", 8082);
  connectStorageEmulator(storage, "localhost", 9199);
}


export { auth, analytics, db, storage };
export default app;

