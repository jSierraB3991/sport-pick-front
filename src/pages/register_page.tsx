import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { useToast } from "../contexts/tast_contexts";
import LoadingBarComponent from "../components/loading_bar_component";
import { getCountriesApi, getIndicativesByCountryApi } from "../api/public_api";
import { CountryModel, Indicative } from "../models/country_models";
import { RegisterApi } from "../api/oauth";

const RegisterPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryModel[]>([]);
    const [indicatives, setIndicatives] = useState<Indicative[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryModel>();
    const [selectIndicatives, setSelectIndicatives] = useState<Indicative | null>();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [documentId, setDocumentId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [countrySearch, setCountrySearch] = useState<string>("");
    const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
    const [showPhoneDropdown, setShowPhoneDropdown] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase()));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast({
                type: "error",
                title: "Error de contraseña",
                message: "Las contraseñas no coinciden",
            });
            return;
        }

        setIsLoading(true);

        try {
            await RegisterApi({
                first_name: firstName,
                last_name: lastName,
                email: email,
                country_id: selectedCountry?.id,
                indicative: selectIndicatives?.indicative,
                cellphone: phoneNumber,
                password: password,
            });

            showToast({
                type: "success",
                title: "¡Registro exitoso!",
                message: "Revisa tu email para validar tu cuenta",
            });

            navigate("/validate-email");
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
            setConfirmPassword("");
        } finally {
            setIsLoading(false);
        }
    };

    const CountryOnClick = async (country: CountryModel) => {
        fetchDataIndicatives(country.id);
        setSelectedCountry(country);
        setCountrySearch("");
        setSelectIndicatives(null);
        setShowCountryDropdown(false);
    };

    const fetchDataIndicatives = async (countryId: number) => {
        setIsLoading(true);
        try {
            const data = await getIndicativesByCountryApi(countryId);
            setIndicatives(data);
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
        } finally {
            setIsLoading(false);
        }
    };

    const fethcData = async () => {
        setIsLoading(true);
        try {
            const data = await getCountriesApi("");
            setCountries(data);
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
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fethcData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {isLoading && <LoadingBarComponent />}
                {/* Logo y título */}
                <div className="text-center mb-8 mt-5">
                    <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-20 h-20 object-contain" />
                </div>
                {/* Formulario */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nombre y Apellido */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                                    Nombre
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    disabled={isLoading}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Juan"
                                    required
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                                    Apellido
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    disabled={isLoading}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Pérez"
                                    required
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Documento de Identidad */}
                        <div>
                            <label htmlFor="documentId" className="block text-sm font-medium text-slate-300 mb-2">
                                Documento de identidad
                            </label>
                            <input
                                id="documentId"
                                type="text"
                                value={documentId}
                                disabled={isLoading}
                                onChange={(e) => setDocumentId(e.target.value)}
                                placeholder="123456789"
                                required
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* País - Autocomplete */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">
                                País
                            </label>
                            <div className="relative">
                                <input
                                    id="country"
                                    type="text"
                                    disabled={isLoading}
                                    value={countrySearch || selectedCountry?.name}
                                    onChange={(e) => {
                                        setCountrySearch(e.target.value);
                                        setShowCountryDropdown(true);
                                    }}
                                    onFocus={() => setShowCountryDropdown(true)}
                                    placeholder="Buscar país..."
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />

                                {showCountryDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowCountryDropdown(false)} />
                                        <div className="absolute z-20 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                            {filteredCountries.map((country) => (
                                                <button
                                                    key={country.id}
                                                    type="button"
                                                    onClick={() => CountryOnClick(country)}
                                                    className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center gap-2 text-white">
                                                    <span>{country.name}</span>
                                                </button>
                                            ))}
                                            {filteredCountries.length === 0 && <div className="px-4 py-3 text-slate-400 text-sm">No se encontraron países</div>}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Correo electrónico
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

                        {/* Número de Celular - Indicador + Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                                Número celular
                            </label>
                            <div className="flex gap-2">
                                {/* Select de Indicador */}
                                <div className="relative w-32">
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
                                        className="w-full px-3 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all flex items-center justify-between">
                                        <span className="flex items-center gap-1">
                                            <span className="text-sm">{selectIndicatives?.indicative}</span>
                                        </span>
                                        <ChevronDown size={16} className="text-slate-400" />
                                    </button>

                                    {showPhoneDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setShowPhoneDropdown(false)} />
                                            <div className="absolute z-20 w-64 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                                {indicatives.map((indicative) => (
                                                    <button
                                                        key={indicative.indicative}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectIndicatives(indicative);
                                                            setShowPhoneDropdown(false);
                                                        }}
                                                        className="w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors flex items-center gap-2 text-white text-sm">
                                                        <span>{indicative.indicative}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Input de Número */}
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phoneNumber}
                                    disabled={isLoading}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                                    placeholder="0000000000"
                                    required
                                    className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirmar Contraseña */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                Confirmar contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6">
                            {isLoading ? "Registrando..." : "Registrarse ahora"}
                        </button>

                        {/* Login Link */}
                        <div className="text-center mt-4">
                            <span className="text-sm text-slate-400">¿Ya tienes cuenta? </span>
                            <Link
                                to="/login"
                                className={
                                    isLoading
                                        ? "text-sm text-teal-400 hover:text-teal-300 transition-colors underline pointer-events-none opacity-50"
                                        : "text-sm text-teal-400 hover:text-teal-300 transition-colors underline"
                                }>
                                Iniciar sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
