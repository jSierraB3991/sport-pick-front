import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home_page";
import LoginPage from "./pages/login_page";
import { ToastProvider } from "./contexts/tast_contexts";
import ToastContainer from "./components/toast_container";
import RegisterPage from "./pages/register_page";
import DashboardRedirect from "./libs/dahboard_redirect.tsx";
import ProtectedRoute from "./components/protected_routes.tsx";
import UserDashboardLayout from "./components/layouts/user_dashboard_layout.tsx";
import AdminDashboardLayout from "./components/layouts/admin_dashboard_layout.tsx";
import AdminHomnePage from "./pages/admin_page/admin_home_page.tsx";
import UserHomePage from "./pages/users_page/user_home_page.tsx";
import NotFoundPage from "./pages/not_found_page.tsx";
import AdminSportPage from "./pages/admin_page/sports_admin_page.tsx";
import CountriesAdminPage from "./pages/admin_page/countries_admin_page.tsx";
import PersonalDataPage from "./pages/users_page/personal_data_page.tsx";
import ChallengeUserPage from "./pages/users_page/challenges_user_page.tsx";

function App() {
    const RouterComponent = BrowserRouter;

    return (
        <RouterComponent>
            <ToastProvider>
                <ToastContainer />
                <Routes>
                    {/* Public Routes */}
                    <Route>
                        <Route path="/home" element={<HomePage />} />
                    </Route>
                    <Route path="/dashboard" element={<DashboardRedirect />} />

                    {/* User Dashboard Routes */}
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute requiredRole="user">
                                <UserDashboardLayout />
                            </ProtectedRoute>
                        }>
                        <Route index element={<Navigate to="/user/home" replace />} />
                        <Route path="home" element={<UserHomePage />} />
                        <Route path="personal-data" element={<PersonalDataPage />} />
                        <Route path="challenges" element={<ChallengeUserPage />} />
                    </Route>
                    {/* Admin Dashboard Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminDashboardLayout />
                            </ProtectedRoute>
                        }>
                        <Route index element={<Navigate to="/admin/home" replace />} />
                        <Route path="home" element={<AdminHomnePage />} />

                        <Route path="sports" element={<AdminSportPage />} />
                        <Route path="sport-countries/:sportId" element={<CountriesAdminPage />} />
                    </Route>

                    {/* Redirect root to login */}
                    <Route path="/" element={<Navigate to="/home" replace />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </ToastProvider>
        </RouterComponent>
    );
}

export default App;
