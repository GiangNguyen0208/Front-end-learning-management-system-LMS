import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { toast } from "react-toastify";
import { saveAuthData } from "../../../../utils/helper/authUntils";
import { addDocument, generateKeywords } from "../../../../firebase/services";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/config";
import { browserLocalPersistence, setPersistence } from "firebase/auth";


export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
  const token = searchParams.get("token");
  const userEncoded = searchParams.get("user");

  const saveUserToFirebase = async (userData) => {
    try {
        await setPersistence(auth, browserLocalPersistence);

        // const userCredential = await crea
        const rawUID = userData.id || userData.uid;
        const firebaseUID = String(rawUID);
        console.log("firebaseUID:", firebaseUID, typeof firebaseUID);

        if (!firebaseUID || firebaseUID === "undefined") {
        throw new Error("firebaseUID không hợp lệ");
        }

        const userRef = doc(db, "users", firebaseUID);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            
        const displayNameRaw = userData.name || userData.displayName || "No name";
        const displayName = typeof displayNameRaw === "string" ? displayNameRaw : String(displayNameRaw);
        const email = userData.emailId || "unknown@email.com";

        console.log("Đang lưu user với id:", firebaseUID, {
            displayName,
            emailId: email,
            firebase_uid: firebaseUID,
            photoURL: userData.avatar || userData.photoURL || null,
            providerId: userData.provider || "google",
            role: userData.role || "Student",
            createdAt: new Date(),
        });

        const docData = {
            displayName,
            email,
            firebase_uid: firebaseUID,
            photoURL: userData.photoURL || null,
            providerId: userData.provider || "google",
            role: userData.role || "Student",
            createdAt: new Date(),
        };
        await setDoc(userRef, docData);
        }
    } catch (err) {
        console.error("❌ Lỗi khi lưu user login Google vào Firestore:", err);
    }
    };



  try {
    const userData = userEncoded ? JSON.parse(atob(userEncoded)) : null;

    if (token && userData) {
      login(token, userData);
      saveAuthData(token, userData);
      console.log("User Data Google Login: ", userData);
        
      // 👉 Lưu vào Firestore sau khi login
      saveUserToFirebase(userData);

      toast.success("Đăng nhập thành công!");
      navigate("/home");
    } else {
      throw new Error("Missing token or user data");
    }
  } catch (e) {
    toast.error("Đăng nhập thất bại");
    navigate("/login");
  }
}, []);


  return <div>Đang xử lý đăng nhập...</div>;
}
