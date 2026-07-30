import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getRoleUser, getToken } from "../libs/token_data";
import { ROLE_ADMIN, ROLE_USER } from "../libs/constants";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: "user" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    // TODO: Implementar lógica de autenticación real
    const isAuthenticated = getToken();
    const location = useLocation();
    let userManual = "";
    const userRole = getRoleUser();
    if (userRole == ROLE_ADMIN) {
        userManual = "admin";
    } else if (userRole == ROLE_USER) {
        userManual = "user";
    }

    const roouteLogin = `/login?route=${location.pathname}`;

    if (!isAuthenticated) {
        return <Navigate to={roouteLogin} replace />;
    }

    if (requiredRole && userManual !== requiredRole) {
        return <Navigate to={roouteLogin} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
