import { Spin } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
        if (!user && location.pathname !== "/login") {
            navigate("/login"); // 🟢 Chỉ điều hướng khi cần
        }
    }
  }, [user, isLoading, navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
