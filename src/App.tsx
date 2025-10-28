import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home_page";
import LoginPage from "./pages/login_page";
import { ToastProvider } from "./contexts/tast_contexts";
import ToastContainer from "./components/toast_container";

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
                    <Route path="/login" element={<LoginPage />} />
                    {/*<Route path="/register" element={<RegisterPage />} />*/}

                    {/* User Dashboard Routes */}
                    <Route path="/user">
                        <Route index element={<Navigate to="/user/home" replace />} />
                    </Route>

                    {/* Admin Dashboard Routes */}
                    <Route path="/admin">
                        <Route index element={<Navigate to="/admin/home" replace />} />
                    </Route>

                    {/* Redirect root to login */}
                    <Route path="/" element={<Navigate to="/home" replace />} />

                    {/* 404 Not Found */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </ToastProvider>
        </RouterComponent>
    );
}

export default App;
