import { useEffect, useState } from "react";
import LoadingBarComponent from "../../components/loading_bar_component";
import { UserResponse } from "../../models/user_models";
import InfoRowComponent from "../../components/info_row_component";
import { getUserDataApi } from "../../api/user_api";
import { useToast } from "../../contexts/tast_contexts";
import { CountryModel, Indicative } from "../../models/country_models";
import { getCountriesApi, getIndicativesByCountryApi } from "../../api/public_api";

const PersonalDataPage: React.FC = () => {
    const { showToast } = useToast();
    const [userData, setUserData] = useState<UserResponse>();
    const [isLoading, setIsLoading] = useState(false);

    const [countries, setCountries] = useState<CountryModel[]>([]);
    const [indicatives, setIndicatives] = useState<Indicative[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryModel | null>();
    const [selectIndicatives, setSelectIndicatives] = useState<Indicative | null>();

    const countryOnChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true);
        try {
            const value = Number(e.target.value);
            const countrySelect = countries.filter((c) => c.id == value)[0];
            setSelectedCountry(countrySelect);

            const dataIndicatives = await getIndicativesByCountryApi(value);
            setIndicatives(dataIndicatives);
            setSelectIndicatives(null);
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

    const indicativeOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const indicativeSelect = indicatives.filter((c) => c.indicative == value);
        setSelectIndicatives(indicativeSelect[0]);
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const dataCountries = await getCountriesApi("");
            setCountries(dataCountries);

            const dataUser = await getUserDataApi();
            setUserData(dataUser);

            if (dataUser.country !== 0) {
                const countrySelect = dataCountries.filter((c) => c.id == dataUser.country)[0];
                setSelectedCountry(countrySelect);
                const dataIndicatives = await getIndicativesByCountryApi(dataUser.country);
                setIndicatives(dataIndicatives);
                if (dataUser.indicative !== "") {
                    const indicativesSelect = dataIndicatives.filter((i) => i.indicative == dataUser.indicative);
                    setSelectIndicatives(indicativesSelect[0]);
                }
            }
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
        fetchData();
    }, []);

    return (
        <>
            {isLoading && <LoadingBarComponent />}

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-4">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={userData?.image_user || "/avatar.png"}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl">👤</span>';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                        <InfoRowComponent label="Código de Usuario" value={userData?.user_code || "-"} onChange={(e) => console.log(e)} disabled={true} />
                        <InfoRowComponent label="Nombre" value={userData?.first_name || "-"} onChange={(e) => console.log(e)} />
                        <InfoRowComponent label="Apellido" value={userData?.last_name || "-"} onChange={(e) => console.log(e)} />

                        <div className="px-6 py-4 border-b border-slate-700">
                            <label className="block text-slate-400 text-sm mb-3">Celular</label>

                            <div className="grid grid-cols-12 gap-3">
                                {/* País */}
                                <select
                                    value={selectedCountry?.id}
                                    onChange={countryOnChange}
                                    className="col-span-8 sm:col-span-10 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Indicativo */}
                                <select
                                    value={selectIndicatives?.indicative}
                                    onChange={indicativeOnChange}
                                    className="col-span-3 sm:col-span-2 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option key="" value=""></option>
                                    {indicatives.map((indicative) => (
                                        <option key={indicative.indicative} value={indicative.indicative}>
                                            +{indicative.indicative}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <InfoRowComponent label="Celular" value={userData?.cellphone || "-"} onChange={(e) => console.log(e)} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalDataPage;
