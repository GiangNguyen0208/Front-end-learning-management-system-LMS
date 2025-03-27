import axiosClient from "./axiosClient";
import { auth, db, storage } from "../firebase/config";
import { browserLocalPersistence, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ADMIN_INFO } from "./constant";
// import firebase from "firebase/compat/app";

// 🔍 Hàm kiểm tra user đã tồn tại chưa
async function checkUserExists(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0;
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
      });
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi đăng nhập:", error);
      throw error;
    }
  },
  
  /// Đăng ký làm Mentor
  registerMentor: async (mentorData, user, setUser) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Bạn phải đăng nhập trước khi đăng ký Mentor.");
  
      let profilePicUrl = "";
      let selectedCertificateUrl = "";
      let profilePicFile = null;
      let selectedCertificatePic = "";
  
      // 🟢 Kiểm tra nếu `profilePic` là File thì upload lên Firebase Storage
      if (mentorData.profilePic && mentorData.profilePic && mentorData.selectedCertificate instanceof File) {
        try {
          const file = mentorData.profilePic;
          profilePicFile = file;
          selectedCertificatePic = file;
  
          // 🟢 Tạo đường dẫn lưu ảnh: `/profile_pictures/{user.uid}/profile.jpg`
          const storageRef = ref(storage, `profile_pictures/${user.uid}/profile.jpg`);
  
          // 🟢 Upload ảnh lên Firebase Storage
          const snapshot = await uploadBytes(storageRef, file);
          profilePicUrl = await getDownloadURL(snapshot.ref);
          selectedCertificateUrl = await getDownloadURL(snapshot.ref);
  
          console.log("✅ Ảnh đại diện đã được tải lên Firebase:", profilePicUrl);
          console.log("✅ Ảnh chứng chỉ Ngôn ngữ đã được tải lên Firebase:", selectedCertificateUrl);
        } catch (error) {
          console.error("❌ Lỗi khi upload ảnh:", error);
          throw new Error("Không thể tải ảnh lên. Vui lòng thử lại.");
        }
      }
  
      // 🟢 Cập nhật thông tin vào Firestore (giữ thông tin cũ)
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      const oldData = userSnapshot.exists() ? userSnapshot.data() : {};
  
      await setDoc(userRef, {
        ...oldData,
        role: "Mentor",
        profilePic: profilePicUrl || oldData.profilePic || null,
        selectedCertificate: selectedCertificateUrl || oldData.selectedCertificate || null,
        age: mentorData.age,
        bio: mentorData.bio,
        highestQualification: mentorData.highestQualification,
        profession: mentorData.profession,
        experience: mentorData.experience,
        languageCertificate: mentorData.languageCertificate, // 🆕 Bằng cấp ngôn ngữ
        degreeLevel: mentorData.degreeLevel, // 🆕 Bậc cấp
      }, { merge: true });
  
      // 🟢 Gửi dữ liệu lên Backend
      const formData = new FormData();
      if (profilePicFile) formData.append("profilePic", profilePicFile);
      if (selectedCertificatePic) formData.append("selectedCertificate", selectedCertificatePic);
      formData.append("profilePicUrl", profilePicUrl);
      formData.append("selectedCertificate", selectedCertificateUrl);
      formData.append("age", mentorData.age);
      formData.append("bio", mentorData.bio);
      formData.append("highestQualification", mentorData.highestQualification);
      formData.append("profession", mentorData.profession);
      formData.append("experience", mentorData.experience);
      formData.append("mentorId", mentorData.mentorId);
      formData.append("languageCertificate", mentorData.languageCertificate);
      formData.append("degreeLevel", mentorData.degreeLevel);

  
      try {
        const response = await axiosClient.put("/user/mentor/detail/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // ✅ Cập nhật localStorage và Context
        const updatedUser = { ...user, role: "Mentor" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // ✅ Cập nhật Context để giao diện re-render

        return response.data;
      } catch (error) {
        console.error("❌ Lỗi khi gửi dữ liệu lên backend:", error);
        throw new Error("Đăng ký mentor thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("❌ Lỗi khi đăng ký Mentor:", error);
      throw error;
    }
  },
  

  register: async (data) => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Lưu đăng nhập lâu dài
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
        displayName: data.username,
        emailId: data.email,
        firebase_uid: firebaseUser.uid, // 🔥 Lưu Firebase UID vào Firestore
        role: data.role || "Student",
        createdAt: new Date(),
      });

      // 🟢 Gửi user lên backend (không cần Firebase)
      const response = await axiosClient.post("/user/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.email, // 🔥 Đổi từ `emailId` -> `email` (để đồng nhất với backend)
        username: data.username,
        password: data.password, // 🔥 Gửi password để backend mã hóa
        role: data.role || "Student",
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


export async function initializeAdmin() {
  try {
    console.log("🔍 Kiểm tra admin:", ADMIN_INFO.emailId);

    const adminExists = await checkUserExists(ADMIN_INFO.emailId);
    if (adminExists) {
      console.log("✅ Admin đã tồn tại!");
      return;
    }

    console.log("🚀 Tạo tài khoản admin...");

    // 🟢 Đăng ký Admin trên Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_INFO.emailId, ADMIN_INFO.password);
    const firebaseUser = userCredential.user;

    // 🟢 Lưu admin vào Firestore
    const adminRef = doc(db, "users", firebaseUser.uid);
    await setDoc(adminRef, {
      username: ADMIN_INFO.username,
      firstName: ADMIN_INFO.firstName,
      lastName: ADMIN_INFO.lastName,
      emailId: ADMIN_INFO.emailId,
      firebase_uid: firebaseUser.uid,
      role: "Admin",
      createdAt: new Date(),
    });

    console.log("✅ Admin đã được tạo thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi khởi tạo admin:", error);
  }
}
export default authApi;
