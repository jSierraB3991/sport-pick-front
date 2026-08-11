import { JSX, useEffect, useRef, useState } from "react";
import FooterComponent from "../components/footer_component";
import HeaderComponent from "../components/header_component";
import { BetDataSportsApi, betSearchByLeagueApi } from "../api/bet_data_api";
import { useToast } from "../contexts/tast_contexts";
import { BetDataHome, LiveDataMatchWs, LiveMatchBetResponseWs, PpalLeagues, PPalLeaguesByCountry } from "../models/bet_dat_models";
import GetSportIcon from "../components/icons_sport";
import { getRoleUser } from "../libs/token_data";
import { getLiveMatchsApiWs } from "../api/base_ws_socket";

interface League {
    name: string;
    icon: string;
}

export const HomePage = (): JSX.Element => {
    const { showToast } = useToast();

    const [activeSport, setActiveSport] = useState("football");
    const [userRole, setUserRole] = useState("public");
    const [countryLeagues, setCountryLeagues] = useState("");
    const [pPlaLeague, setPPalLeague] = useState("");
    const [query, setQuery] = useState("");

    const [liveDataNMatch, setLiveDataMatch] = useState<LiveDataMatchWs[] | undefined>([]);
    const [liveResultMatch, setLiveResultMatch] = useState<LiveDataMatchWs[] | undefined>([]);

    const [spoortOdds, setSportdds] = useState<BetDataHome[]>([]);

    const [ppalLeaguesByCountry, setPpalLeguesByCountry] = useState<PPalLeaguesByCountry[]>([]);
    const [ppalLeagues, setPpalLegues] = useState<PpalLeagues[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);

    const [changeMatchs, setChangeMatchs] = useState(true);
    const changeMatchsRef = useRef(changeMatchs);

    const topLeagues: League[] = [
        { name: "Europa League", icon: "🏆" },
        { name: "Premier League", icon: "👑" },
        { name: "La Liga", icon: "⚽" },
        { name: "Serie A", icon: "🇮🇹" },
        { name: "Champions", icon: "⭐" },
    ];

    const disconnectMatchLive = () => {
        console.log("disconnect");
        console.log(wsRef.current);
        wsRef.current?.send("unregister");
        wsRef.current?.close();
        wsRef.current = null;
    };

    const getMatchInLive = async () => {
        if (wsRef.current) return; // evitar duplicados
        const ws = getLiveMatchsApiWs();
        setIsLoading(true);
        ws!.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onopen = () => console.log("WS conectado");
        ws!.onmessage = (event) => {
            setIsLoading(false);
            const dataWs = JSON.parse(event.data) as LiveMatchBetResponseWs;
            if (changeMatchsRef.current) {
                setLiveDataMatch(dataWs.data?.liva_data);
            }

            let filteredAndSorted = [...(dataWs.data?.liva_data || [])];
            filteredAndSorted = filteredAndSorted.filter((item) => item.match_state !== "NOT_STARTED").sort((a, b) => b.live_odd_count - a.live_odd_count); // Recuerda restar para ordenar numéricamente

            setLiveResultMatch(filteredAndSorted.slice(0, 4));
        };

        ws!.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        wsRef.current = ws;

        return () => ws?.close();
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const betDataApi = await BetDataSportsApi();
            if (betDataApi != null) {
                setSportdds(betDataApi);
                const activeSportKey = betDataApi[0]?.term_key || "";
                setActiveSport(activeSportKey);
                if (activeSportKey !== "") {
                    const ppalLeaguesByCountry = betDataApi.filter((bd) => bd.term_key == activeSportKey).map((bd) => bd.ppal_leagues_by_country)[0];
                    const countryKey = ppalLeaguesByCountry[0]?.term_key || "";
                    setCountryLeagues(countryKey);
                    setPpalLeguesByCountry(ppalLeaguesByCountry || []);

                    if (countryKey !== "") {
                        const ppalLeagues = ppalLeaguesByCountry[0].ppal_leagues || [];
                        setPpalLegues(ppalLeagues);
                        const leagueKey = ppalLeagues[0]?.term_key || "";
                        setPPalLeague(leagueKey);

                        if (leagueKey !== "") {
                            callMatchesByLeague(activeSportKey, countryKey, leagueKey);
                        }
                    }
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
                title: "Error al buscar las posibles apuestas",
                message: message,
                duration: 0,
                isShowRecharge: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const callMatchesByLeague = async (sport: string, country: string, league: string) => {
        setIsLoading(true);
        try {
            const data = await betSearchByLeagueApi(sport, country, league);
            setLiveDataMatch(data.league_data);
            setChangeMatchs(false);
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
                title: "Error al buscar las posibles apuestas",
                message: message,
                duration: 0,
                isShowRecharge: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        changeMatchsRef.current = changeMatchs; // mantener actualizada la ref
    }, [changeMatchs]);

    useEffect(() => {
        if (query != "" && query.length > 3) {
            console.log(query);
        }
    }, [query]);

    useEffect(() => {
        const role = getRoleUser();
        setUserRole(role == "" ? "public" : role);
        fetchData();
        getMatchInLive();
        return () => {
            //disconnectMatchLive(); // cerrar al desmontar
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 mx-auto">
            {/* Header */}
            <HeaderComponent loading={isLoading} userType={userRole} showSearchBar={false} setSearch={setQuery} />
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-1">Partido con más Apuestas </h2>
                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Apuesta por # de Goles</h3>
                </div>
                <div className="absolute right-2 sm:right-4 lg:right-12 top-1/2 transform -translate-y-1/2">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <div className="text-4xl sm:text-6xl lg:text-7xl">⚽</div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden sm:block">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="2" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="2" />
                        <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* Live Scores */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 space-y-3 shadow-sm">
                {liveResultMatch?.map((match) => (
                    <div key={match.id} className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="text-xl sm:text-2xl flex-shrink-0">⚽</div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-xs sm:text-sm truncate text-slate-800">
                                    {match.home_name.length > 17 ? match.home_name.slice(0, 14) + "..." : match.home_name}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 flex-shrink-0">
                            <span className="text-xl sm:text-2xl font-bold text-slate-900">{match.stadistics.match_score.score_home}</span>
                            <span className="text-xl sm:text-2xl font-bold text-slate-400">:</span>
                            <span className="text-xl sm:text-2xl font-bold text-slate-900">{match.stadistics.match_score.score_away}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                            <div className="flex flex-col items-end min-w-0">
                                <span className="font-semibold text-xs sm:text-sm truncate text-slate-800">
                                    {match.away_name.length > 17 ? match.away_name.slice(0, 14) + "..." : match.away_name}
                                </span>
                            </div>
                            <div className="text-xl sm:text-2xl flex-shrink-0">⚽</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sports Filter */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto border-b border-slate-200 shadow-sm">
                {spoortOdds !== null &&
                    spoortOdds.length > 0 &&
                    spoortOdds.map((sp) => (
                        <button
                            key={sp.term_key}
                            onClick={() => {
                                setActiveSport(sp.term_key);
                                setCountryLeagues("");
                                setPPalLeague("");
                                setPpalLeguesByCountry(sp.ppal_leagues_by_country);
                                setPpalLegues([]);
                                setLiveDataMatch([]);
                            }}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                                activeSport === sp.term_key
                                    ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}>
                            {GetSportIcon(sp.term_key)} {sp.name}
                        </button>
                    ))}
            </div>

            {/* Country Filter */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto border-b border-slate-200 shadow-sm">
                {ppalLeaguesByCountry !== null &&
                    ppalLeaguesByCountry.length > 0 &&
                    ppalLeaguesByCountry.map((sp) => (
                        <button
                            key={sp.term_key}
                            onClick={() => {
                                setCountryLeagues(sp.term_key);
                                setPPalLeague("");
                                setLiveDataMatch([]);
                                if (sp.ppal_leagues !== null) {
                                    setPpalLegues(sp.ppal_leagues);
                                } else {
                                    setPpalLegues([
                                        {
                                            english_name: "all",
                                            name: "Todos",
                                            term_key: "all",
                                        },
                                    ]);
                                }
                            }}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                                countryLeagues === sp.term_key
                                    ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}>
                            {GetSportIcon(sp.term_key)} {sp.contry_name}
                        </button>
                    ))}
            </div>
            {/* Leagues Filter */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto border-b border-slate-200 shadow-sm">
                {ppalLeagues !== null &&
                    ppalLeagues.length > 0 &&
                    ppalLeagues.map((ppl) => (
                        <button
                            key={ppl.term_key}
                            onClick={() => {
                                setPPalLeague(ppl.term_key);
                                callMatchesByLeague(activeSport, countryLeagues, ppl.term_key);
                            }}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                                pPlaLeague === ppl.term_key
                                    ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}>
                            {GetSportIcon(ppl.term_key)} {ppl.name}
                        </button>
                    ))}
            </div>

            {/* Matches List */}
            <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {liveDataNMatch?.map(
                        (match, idx) =>
                            match.best_offers != null && (
                                <div key={idx} className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0"></div>
                                            <span className="text-xs text-slate-600 truncate font-medium">{match.group}</span>
                                        </div>
                                        <span className="text-xs font-semibold text-orange-600 whitespace-nowrap ml-2">
                                            {new Date(match.match_start).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm mb-1 truncate text-slate-800">{match.home_name}</div>
                                            <div className="font-semibold text-sm truncate text-slate-800">{match.away_name}</div>
                                        </div>
                                        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                                            {match.best_offers &&
                                                match.best_offers.length >= 1 &&
                                                match.best_offers[0].outcomes.map((odd) => (
                                                    <button
                                                        key={odd.data}
                                                        className="bg-slate-100 sm:bg-black hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 hover:border-teal-300 border border-slate-200 px-2 sm:px-4 py-2 rounded-lg text-sm font-bold min-w-[50px] sm:min-w-[60px] transition-all">
                                                        <div className="text-xs text-slate-500 mb-0.5">
                                                            {odd.data} {odd.line == null ? "" : odd.line / 1000}
                                                        </div>
                                                        <div className="text-slate-900">{odd.odds / 1000}</div>
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>

            {/* Top Leagues Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-800">Top League</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-3">
                    {topLeagues.map((league, idx) => (
                        <button
                            key={idx}
                            className="bg-white rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl flex flex-col items-center gap-2 transition-all hover:scale-105 border border-slate-200">
                            <div className="text-2xl sm:text-3xl">{league.icon}</div>
                            <span className="text-xs text-center font-medium text-slate-700">{league.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <FooterComponent />
        </div>
    );
};

export default HomePage;
