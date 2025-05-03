import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userFireBase, setUserFirebase] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (token, userData) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData); // ✅ Cập nhật state user
    
    // Điều hướng dựa trên role
    if (userData?.role !== null) {
      navigate("/home");
    }
    // } else if (userData?.role === "Mentor") {
    //   navigate("/home");
    // } else if (userData?.role === "Admin") {
    //   navigate("/home");
    // } 
    else {
      navigate("/home");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công!");
    setIsLoggedIn(false);
    setUser(null); // ✅ Xóa user khi logout
    navigate("/home");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUser = localStorage.getItem("user");
  
    if (storedToken && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser)); // ✅ Gán user từ localStorage
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserFirebase({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else {
        setUserFirebase(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, userFireBase, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
