import { Menu, Search } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/header.css";
import LoadingBarComponent from "./loading_bar_component";
import UserMenuComponent from "./user_menu";
import { getToken } from "../libs/token_data";
import { getUserDataApi } from "../api/user_api";
import { useToast } from "../contexts/tast_contexts";
import { UserResponse } from "../models/user_models";

export interface HeaderParams {
    loading: boolean;
    userType: string;
    showSearchBar: boolean;
    setSearch: (search: string) => void;
}

const HeaderComponent = ({ loading, setSearch, userType = "public", showSearchBar = false }: HeaderParams): JSX.Element => {
    const { showToast } = useToast();
    const [userData, setUserData] = useState<UserResponse>();

    const [isLoading, setIsLoading] = useState(false);

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
        if (toke !== "") {
            fetchData();
        }
    }, []);

    return (
        <>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 py-3 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <Menu className="w-6 h-6 text-white cursor-pointer hover:text-orange-400 transition-colors" />
                    {userType === "public" && (
                        <div className="flex gap-4">
                            <Link
                                className="bg-gradient-to-r from-orange-500 to-orange-600 block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all"
                                style={{
                                    color: "white",
                                }}
                                to="/register">
                                Registrarse
                            </Link>
                            <Link
                                className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all"
                                to="/login">
                                Ir a Login
                            </Link>
                        </div>
                    )}
                    {userType !== "public" && (
                        <div className="flex items-center gap-4">
                            <UserMenuComponent userName={userData?.first_name + " " + userData?.last_name} userEmail={userData?.email || ""} />
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                {showSearchBar && (
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-full py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-700"
                        />
                        {/*<Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 cursor-pointer hover:text-orange-400 transition-colors" />*/}
                    </div>
                )}
            </div>
            {(loading || isLoading) && <LoadingBarComponent />};
        </>
    );
};

export default HeaderComponent;
