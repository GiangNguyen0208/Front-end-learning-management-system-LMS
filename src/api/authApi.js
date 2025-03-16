import axiosClient from "./axiosClient";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function checkUserExists(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0; // Nếu có phương thức đăng nhập, user đã tồn tại
}

const authApi = {
  // 🟢 Đăng nhập (Firebase + Backend API)
  login: async (data) => {
    try {
      console.log("📤 Đăng nhập với:", data); // Debug dữ liệu đầu vào
      console.log("📤 Đăng nhập với:", data.email);
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("✅ Firebase user:", userCredential); // Debug dữ liệu Firebase trả về
  
      const firebaseUser = userCredential.user;
      const response = await axiosClient.post("/user/login", {
        emailId: data.email,
        firebase_uid: firebaseUser.uid,
        password: data.password,
        role: "Student",
      });
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi đăng nhập:", error);
      throw error;
    }
  },
  
  register: async (data) => {
    try {
      // 🛠 Kiểm tra user đã tồn tại chưa
      if (await checkUserExists(data.email)) {
        throw new Error("User already exists! Hãy đăng nhập.");
      }
      // 🟢 Tạo user trong Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;

      // 🟢 Lưu user vào Firestore
      const userRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userRef, {
        displayName: data.firstName + " " + data.lastName,
        emailId: data.email,
        firebase_uid: firebaseUser.uid, // 🔥 Lưu Firebase UID vào Firestore
        role: data.role || "Student",
        status: "Active",
        createdAt: new Date(),
      });

      // 🟢 Gửi user lên backend (không cần Firebase)
      const response = await axiosClient.post("/user/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.email, // 🔥 Đổi từ `emailId` -> `email` (để đồng nhất với backend)
        username: data.username,
        password: data.password, // 🔥 Gửi password để backend mã hóa
        role: data.role,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("❌ Lỗi từ backend:", error.response.data);
        console.error("🔴 Status Code:", error.response.status);
        console.error("🔴 Headers:", error.response.headers);
      } else if (error.request) {
        console.error("❌ Không nhận phản hồi từ server:", error.request);
      } else {
        console.error("❌ Lỗi không xác định:", error.message);
      }
      throw error;
    }
  },

  verifyEmail: async (token) => {
    try {
      console.log("🔍 Sending token:", token); // Kiểm tra token trước khi gửi
  
      const response = await axiosClient.get(`/user/confirm?token=${token}`);
      console.log("✅ API Response:", response); // Kiểm tra toàn bộ phản hồi
  
      return response.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("❌ API Error:", error.response ? error.response.data : error.message);
      return { success: false }; // Tránh lỗi khi API bị lỗi
    }
  },

  // 🟢 Đăng xuất (Firebase + Xóa localStorage)
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("❌ Lỗi khi đăng xuất:", error);
    }
  },
};

export default authApi;
