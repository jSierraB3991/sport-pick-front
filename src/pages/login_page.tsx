// pages/auth/Login.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { LoginApi } from "../api/oauth";
import { useToast } from "../contexts/tast_contexts";
import { getRoleUser, getToken, saveDataUser } from "../libs/token_data";
import { ROLE_ADMIN, ROUTE_ADMIN_HOME, ROUTE_USER_HOME } from "../libs/constants";
import LoadingBarComponent from "../components/loading_bar_component";

const LoginPage: React.FC = () => {
    const { showToast } = useToast();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const dataApiRes = await LoginApi({ email, password, rememberMe });
            saveDataUser(dataApiRes);
            const dasshboardRoute = dataApiRes.role == ROLE_ADMIN ? ROUTE_ADMIN_HOME : ROUTE_USER_HOME;
            navigate(dasshboardRoute);
        } catch (error) {
            let message = "";
            if (error instanceof Error && "response" in error) {
                const axiosError = error as any;
                message = axiosError.response?.data?.message || "Ocurrió un error desconocido";
            } else {
                message = "Ocurrió un error inesperado";
            }
            showToast({
                type: "error",
                title: "Error de autenticación",
                message: message,
                duration: 0,
                isShowRecharge: false,
            });
            setPassword("");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (token !== "") {
            const dasshboardRoute = getRoleUser() == ROLE_ADMIN ? ROUTE_ADMIN_HOME : ROUTE_USER_HOME;
            navigate(dasshboardRoute);
        }
    }, []);

    return (
        <>
            {isLoading && <LoadingBarComponent />}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Logo y título */}
                    <div className="text-center mb-8">
                        <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-20 h-20 object-contain" />
                        <p className="text-slate-400 text-sm px-4">Ingresa y vive la emoción de las apuestas deportivas en tiempo real.</p>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            <span className="text-white">GAME</span>
                            <br />
                            <span className="text-white">FUNDED</span>
                        </h1>
                    </div>

                    {/* Formulario */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                    Usuario
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    disabled={isLoading}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    required
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        disabled={isLoading}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            disabled={isLoading}
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="sr-only"
                                        />
                                        <div className={`w-11 h-6 rounded-full transition-colors ${rememberMe ? "bg-teal-500" : "bg-slate-600"}`}></div>
                                        <div
                                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                                rememberMe ? "transform translate-x-5" : ""
                                            }`}></div>
                                    </div>
                                    <span className="ml-3 text-sm text-slate-300 group-hover:text-white transition-colors">Recordar Datos de usuario</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-800/50 text-slate-400">o</span>
                                </div>
                            </div>

                            {/* Register Button */}
                            <Link
                                to="/register"
                                className={
                                    isLoading
                                        ? "block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-all transform hover:scale-[1.02] active:scale-[0.98] pointer-events-none opacity-50"
                                        : "block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                }>
                                Registrarse
                            </Link>

                            {/* Forgot Password Link */}
                            <div className="text-center mt-4">
                                <Link
                                    to="/forgot-password"
                                    className={
                                        isLoading
                                            ? "text-sm text-teal-400 hover:text-teal-300 transition-colors underline pointer-events-none opacity-50"
                                            : "text-sm text-teal-400 hover:text-teal-300 transition-colors underline"
                                    }>
                                    ¿Olvidaste contraseña?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
