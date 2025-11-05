import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleUser, getToken } from "../libs/token_data";
import { ROLE_ADMIN } from "../libs/constants";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: "user" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    // TODO: Implementar lógica de autenticación real
    const isAuthenticated = getToken();
    const userRole = getRoleUser() == ROLE_ADMIN ? "admin" : "user";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
