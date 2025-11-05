import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Users, Mail, Key, LogOut, Menu, X } from "lucide-react";
import { logOutUser } from "../../libs/token_data";

const AdminDashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logOutUser();
        navigate("/login");
    };

    const menuItems = [
        { path: "/admin/home", icon: Home, label: "Home" },
        { path: "/admin/users", icon: Users, label: "Usuarios" },
        { path: "/admin/emails", icon: Mail, label: "Correos" },
        { path: "/admin/change-password", icon: Key, label: "Cambiar Contraseña" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-4 shadow-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-white">
                            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className="text-2xl font-bold">
                            <img style={{ height: "2.5rem" }} src="/public/logo.png" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white text-sm hidden sm:block">Administrador</span>
                        <button
                            onClick={handleLogout}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Salir</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex">
                {/* Sidebar */}
                <aside
                    className={`${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out mt-[73px] lg:mt-0`}>
                    <nav className="p-4 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive(item.path) ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" : "text-slate-700 hover:bg-slate-100"
                                    }`}>
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ">
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
        </div>
    );
};

export default AdminDashboardLayout;
