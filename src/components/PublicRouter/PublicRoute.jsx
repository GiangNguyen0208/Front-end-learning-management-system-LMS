import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const PublicRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
