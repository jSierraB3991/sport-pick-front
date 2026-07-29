import { FC, useEffect, useState } from "react";
import LoadingBarComponent from "../../components/loading_bar_component";
import { useToast } from "../../contexts/tast_contexts";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getToken } from "../../libs/token_data";
import { AdminCountry, AdminSportUpdate } from "../../models/admin_data";
import { getCountriesBySportApi, updateBetCountriesApi } from "../../api/admin_api";

const CountriesAdminPage: FC = () => {
    const { sportId } = useParams();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [initialData, setInitialData] = useState<AdminCountry[]>([]);
    const [countryData, setCountryData] = useState<AdminCountry[]>([]);

    const handleGoBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1); // Va atrás dentro de tu app
        } else {
            navigate("/admin/sports"); // Ruta por defecto si no hay historial
        }
    };

    const toggleSport = (sportId: number) => {
        console.log(initialData);
        setCountryData((prevData) => prevData.map((sport) => (sport.id === sportId ? { ...sport, is_available: !sport.is_available } : sport)));
    };

    const fetchData = async (sport: string) => {
        setIsLoading(true);
        try {
            const data = await getCountriesBySportApi(Number(sport));
            setInitialData(data || []);
            setCountryData(data || []);
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

    const getSportIdAndFetchData = () => {
        if (sportId == undefined && sportId == null && sportId == "") {
            handleGoBack();
        } else {
            fetchData(sportId!);
        }
    };

    useEffect(() => {
        const toke = getToken();
        if (toke === "") {
            navigate("/login");
            return;
        }
        getSportIdAndFetchData();
    }, []);

    const updateEnabledCountry = async (udpateSports: AdminSportUpdate[]) => {
        setIsLoading(true);
        try {
            await updateBetCountriesApi(udpateSports);
            getSportIdAndFetchData();
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

    const updateEnabledCountryOnClick = () => {
        const changedSports = countryData
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

        updateEnabledCountry(changedSports);
    };

    return (
        <>
            {isLoading && <LoadingBarComponent />}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between mb-6">
                        {/* Botón Volver */}
                        <button
                            disabled={isLoading}
                            onClick={handleGoBack}
                            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        {/* Botón Actualizar */}
                        <button
                            disabled={isLoading}
                            onClick={updateEnabledCountryOnClick}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition">
                            Actualizar
                        </button>
                    </div>
                    {/* Grid de Deportes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {countryData.map((country) => (
                            <div
                                key={country.id}
                                className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 p-6 transition-all ${
                                    country.is_available ? "hover:shadow-2xl hover:scale-[1.02]" : "opacity-60"
                                }`}>
                                <div className="flex items-center gap-6">
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{country.name}</h3>
                                        {country.hot_key && <p className="text-slate-400 text-sm mb-4">{country.hot_key}</p>}

                                        {/* Switch + Botón Países */}
                                        <div className="flex items-center justify-between">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    disabled={isLoading}
                                                    type="checkbox"
                                                    checked={country.is_available}
                                                    onChange={() => toggleSport(country.id)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                                <span className="ml-3 text-sm font-medium text-slate-300">
                                                    {country.is_available ? "Habilitado" : "Deshabilitado"}
                                                </span>
                                            </label>
                                        </div>
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

export default CountriesAdminPage;
