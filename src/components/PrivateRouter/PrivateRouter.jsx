import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";

export default function PrivateRouter() {
    const { user } = useContext(AuthContext);

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}