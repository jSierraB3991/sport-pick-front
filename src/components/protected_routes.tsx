import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleUser, getToken } from "../libs/token_data";
import { ROLE_ADMIN, ROLE_USER } from "../libs/constants";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: "user" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    // TODO: Implementar lógica de autenticación real
    const isAuthenticated = getToken();
    let userManual = "";
    const userRole = getRoleUser();
    if (userRole == ROLE_ADMIN) {
        userManual = "admin";
    } else if (userRole == ROLE_USER) {
        userManual = "user";
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userManual !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
