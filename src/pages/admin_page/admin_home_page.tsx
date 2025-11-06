// pages/user/Home.tsx
import React, { useEffect, useState } from "react";
import { ChevronRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserResponse } from "../../models/user_models";
import { useToast } from "../../contexts/tast_contexts";
import { getUserDataApi } from "../../api/user_api";
import { getToken } from "../../libs/token_data";
import LoadingBarComponent from "../../components/loading_bar_component";

const AdminHomnePage: React.FC = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<UserResponse>();

    const menuItems = [
        {
            id: "personal",
            icon: User,
            label: "Deportes",
            path: "/admin/sports",
        },
    ];

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getUserDataApi();
            setUserData(data);
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
                message: message,
                duration: 0,
                isShowRecharge: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const toke = getToken();
        if (toke === "") {
            navigate("/login");
            return;
        }
        fetchData();
    }, []);

    return (
        <>
            {isLoading && <LoadingBarComponent />}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header con Avatar y Saludo */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-4">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={userData?.image_user || "public/avatar.png"}
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
                            Hola, <span className="text-teal-400">{userData?.first_name}</span>
                        </h1>
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
                </div>
            </div>
        </>
    );
};

export default AdminHomnePage;
