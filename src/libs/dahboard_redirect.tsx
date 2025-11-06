import { Navigate } from "react-router-dom";
import { getRoleUser } from "./token_data";
import { ROLE_ADMIN, ROLE_USER } from "./constants";

function DashboardRedirect() {
    const role = getRoleUser();
    if (role === ROLE_ADMIN) {
        return <Navigate to="/admin/home" replace />;
    }

    if (role === ROLE_USER) {
        return <Navigate to="/user/home" replace />;
    }

    // si no hay rol o no está logueado
    return <Navigate to="/login" replace />;
}

export default DashboardRedirect;
