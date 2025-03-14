// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2pnETrHml1WzoZGvvYJaqPfzc-yGr3ws",
  authDomain: "app-chat-reactjs-9b0e1.firebaseapp.com",
  projectId: "app-chat-reactjs-9b0e1",
  storageBucket: "app-chat-reactjs-9b0e1.firebasestorage.app",
  messagingSenderId: "636364354904",
  appId: "1:636364354904:web:05742789e417b75b23212d",
  measurementId: "G-B1584H6K4Y"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);

// Nếu chạy local, bật emulator
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "localhost", 8080);
}


export { auth, analytics };
export default app;

