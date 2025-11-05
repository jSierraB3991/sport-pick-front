// pages/user/Home.tsx
import React, { useEffect } from "react";
import { ChevronRight, User, Settings, BarChart3, Download, LogOut, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHomnePage: React.FC = () => {
    const userData = {
        name: "Juan",
        balance: 30000,
        realBalance: 30000,
        pendingBonus: 0,
        avatar: "/avatar.png",
    };

    const menuItems = [
        {
            id: "personal",
            icon: User,
            label: "Datos Personales",
            path: "/user/personal-data",
        },
        {
            id: "config",
            icon: Settings,
            label: "Configuración",
            path: "/user/configuration",
        },
        {
            id: "stats",
            icon: BarChart3,
            label: "Estadísticas",
            path: "/user/statistics",
        },
        {
            id: "recharge",
            icon: Download,
            label: "Recargar",
            path: "/user/recharge",
        },
        {
            id: "withdraw",
            icon: LogOut,
            label: "Retirar",
            path: "/user/withdraw",
        },
        {
            id: "bonuses",
            icon: Gift,
            label: "Bonos",
            path: "/user/bonuses",
        },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    useEffect(() => {
        console.log("HERE");
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header con Avatar y Saludo */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-1 shadow-2xl">
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                                <img
                                    src={userData.avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Si la imagen falla, mostrar emoji por defecto
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl">👤</span>';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Hola, <span className="text-teal-400">{userData.name}</span>
                    </h1>
                </div>

                {/* Card de Saldos */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-700 mb-6">
                    <div className="space-y-4">
                        {/* Saldo */}
                        <div className="flex items-center justify-between pb-3 border-b border-teal-500/30">
                            <span className="text-slate-300 font-medium">Saldo:</span>
                            <span className="text-2xl font-bold text-teal-400">{formatCurrency(userData.balance)}</span>
                        </div>

                        {/* Saldo Real */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-600">
                            <span className="text-slate-300 font-medium">Saldo Real:</span>
                            <span className="text-xl font-bold text-white">{formatCurrency(userData.realBalance)}</span>
                        </div>

                        {/* Bonus Pendiente */}
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 font-medium">Bonus Pendiente:</span>
                            <span className="text-xl font-bold text-orange-400">{formatCurrency(userData.pendingBonus)}</span>
                        </div>
                    </div>
                </div>

                {/* Menú de Opciones */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`flex items-center justify-between px-6 py-4 hover:bg-slate-700/50 transition-colors group ${
                                    index !== menuItems.length - 1 ? "border-b border-slate-700" : ""
                                }`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                                        <Icon className="text-slate-300 group-hover:text-white transition-colors" size={20} />
                                    </div>
                                    <span className="text-slate-200 font-medium group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                <ChevronRight className="text-teal-400 group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                        );
                    })}
                </div>

                {/* Logo Grande Decorativo */}
                <div className="mt-12 flex justify-center opacity-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" className="w-64 h-64">
                        {/* Letra G */}
                        <path
                            d="M 40 60 L 40 140 L 100 140 L 100 120 L 60 120 L 60 80 L 100 80 L 100 100 L 80 100 L 80 120 L 120 120 L 120 60 Z"
                            fill="#14b8a6"
                            opacity="0.3"
                        />
                        {/* Letra F */}
                        <path
                            d="M 140 60 L 140 140 L 160 140 L 160 110 L 190 110 L 190 90 L 160 90 L 160 80 L 190 80 L 190 60 Z"
                            fill="#06b6d4"
                            opacity="0.3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AdminHomnePage;
