import { useNavigate } from "react-router-dom";
import LoadingBarComponent from "../../components/loading_bar_component";
import { useToast } from "../../contexts/tast_contexts";
import { useEffect, useState } from "react";
import { AdminSports, AdminSportUpdate } from "../../models/admin_data";
import { getToken } from "../../libs/token_data";
import { getSportsApi, updateSportApi } from "../../api/admin_api";
import GetSportIcon from "../../components/icons_sport";

const AdminSportPage: React.FC = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState<AdminSports[]>([]);
    const [sportsData, setSportsData] = useState<AdminSports[]>([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getSportsApi();
            setSportsData(data);
            setInitialData(data);
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
                duration: 10,
                isShowRecharge: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const udpateSports = async (udpateSports: AdminSportUpdate[]) => {
        setIsLoading(true);
        try {
            await updateSportApi(udpateSports);
            fetchData();
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
    const updateEnabledSports = () => {
        const changedSports = sportsData
            .filter((sport) => {
                const initial = initialData.find((i) => i.id === sport.id);
                return initial && initial.is_available !== sport.is_available;
            })
            .map((sport) => ({
                id: sport.id,
                is_available: sport.is_available,
            }));

        if (changedSports.length <= 0) {
            return;
        }

        udpateSports(changedSports);
    };

    const toggleSport = (sportId: number) => {
        setSportsData((prevData) => prevData.map((sport) => (sport.id === sportId ? { ...sport, is_available: !sport.is_available } : sport)));
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
                <div className="max-w-4xl mx-auto">
                    {/* Botón Actualizar */}
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={updateEnabledSports}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition">
                            Actualizar
                        </button>
                    </div>
                    {/* Grid de Desafíos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {sportsData.map((sport) => (
                            <div
                                key={sport.id}
                                className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 p-6 transition-all ${
                                    sport.is_available ? "hover:shadow-2xl hover:scale-[1.02]" : "opacity-60"
                                }`}>
                                <div className="flex items-center gap-6">
                                    {/* Emoji/Icon */}
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-700 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl flex-shrink-0 shadow-lg">
                                        {GetSportIcon(sport.description)}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{sport.name}</h3>
                                        {sport.description && <p className="text-slate-400 text-sm mb-4">{sport.description}</p>}

                                        {/* Switch */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={sport.is_available}
                                                onChange={() => toggleSport(sport.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                            <span className="ml-3 text-sm font-medium text-slate-300">
                                                {sport.is_available ? "Habilitado" : "Deshabilitado"}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminSportPage;
