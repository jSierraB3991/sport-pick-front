import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import { getRoleUser, getToken } from "../libs/token_data";
import { ROLE_ADMIN, ROUTE_ADMIN_HOME, ROUTE_USER_HOME } from "../libs/constants";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const [isUserRegister, setIsUserRegister] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token !== "") {
            setIsUserRegister(getRoleUser() !== "");
        }
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full text-center">
                {/* Logo */}
                <div className="mb-8">
                    <div className="text-4xl font-bold inline-block">
                        <img src="/public/logo.png" />
                    </div>
                </div>

                {/* 404 Grande */}
                <div className="mb-8 relative">
                    <h1 className="text-[180px] sm:text-[250px] font-black leading-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">4</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">0</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">4</span>
                    </h1>

                    {/* Texto superpuesto */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-2xl sm:text-4xl font-bold opacity-20 transform -rotate-12">NOT FOUND</div>
                    </div>
                </div>

                {/* Mensaje */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">¡Ups! Página no encontrada</h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto">
                        La página que estás buscando no existe o ha sido movida. Verifica la URL o regresa al inicio.
                    </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto">
                        <ArrowLeft size={20} />
                        Volver atrás
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto">
                        <Home size={20} />
                        Ir al inicio
                    </button>
                </div>

                {/* Enlaces útiles */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-700">
                    <h3 className="text-white font-bold mb-4 flex items-center justify-center gap-2">
                        <Search size={20} className="text-teal-400" />
                        Enlaces útiles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {!isUserRegister && (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-slate-300 hover:text-teal-400 hover:bg-slate-700/50 py-2 px-4 rounded-lg transition-colors text-sm">
                                    Iniciar sesión
                                </button>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="text-slate-300 hover:text-teal-400 hover:bg-slate-700/50 py-2 px-4 rounded-lg transition-colors text-sm">
                                    Registrarse
                                </button>
                            </>
                        )}
                        {isUserRegister && (
                            <>
                                <button
                                    onClick={() => navigate(getRoleUser() == ROLE_ADMIN ? ROUTE_ADMIN_HOME : ROUTE_USER_HOME)}
                                    className="text-slate-300 hover:text-teal-400 hover:bg-slate-700/50 py-2 px-4 rounded-lg transition-colors text-sm">
                                    {getRoleUser() == ROLE_ADMIN ? "Admin" : "User"} Home
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Decoración */}
                <div className="mt-12 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
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

export default NotFoundPage;
