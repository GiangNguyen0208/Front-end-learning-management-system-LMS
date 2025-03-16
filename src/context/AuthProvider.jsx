import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));

  const login = (token, userData) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData); // ✅ Cập nhật state user
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null); // ✅ Xóa user khi logout
    navigate("/home");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
