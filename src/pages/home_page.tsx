import { JSX, useState } from "react";
import { Menu, Search, Mic, Trophy, Tv } from "lucide-react";

interface Match {
    league: string;
    time: string;
    home: string;
    away: string;
    odds: string[];
}

interface LiveScore {
    home: string;
    away: string;
    scoreHome: string;
    scoreAway: string;
    time: string;
    homeLogo: string;
    awayLogo: string;
}

interface League {
    name: string;
    icon: string;
}

type TabType = "highlights" | "upcoming";
type SportType = "soccer" | "basketball" | "tennis";

export const HomePage = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState<TabType>("highlights");
    const [activeSport, setActiveSport] = useState<SportType>("soccer");

    const matches: Match[] = [
        {
            league: "Champions League, Group B",
            time: "08.10 / 11:45",
            home: "Porto",
            away: "Liverpool FC",
            odds: ["3.74", "2.10", "4.75"],
        },
        {
            league: "Super Lig",
            time: "08.10 / 16:45",
            home: "Galatasaray",
            away: "Besiktas",
            odds: ["1.35", "2.80", "6.25"],
        },
        {
            league: "Premier League 19/20",
            time: "09.10 / 16:30",
            home: "Crystal Palace",
            away: "Manchester City",
            odds: ["3.35", "2.80", "2.15"],
        },
    ];

    const liveScores: LiveScore[] = [
        {
            home: "Juventus",
            away: "Milan",
            scoreHome: "2",
            scoreAway: "0",
            time: "38' 1st Half",
            homeLogo: "⚫⚪",
            awayLogo: "🔴⚫",
        },
        {
            home: "Manchester U",
            away: "Leicester",
            scoreHome: "0",
            scoreAway: "1",
            time: "42' 1st Half",
            homeLogo: "🔴",
            awayLogo: "🔵",
        },
    ];

    const topLeagues: League[] = [
        { name: "Europa League", icon: "🏆" },
        { name: "Premier League", icon: "👑" },
        { name: "La Liga", icon: "⚽" },
        { name: "Serie A", icon: "🇮🇹" },
        { name: "Champions", icon: "⭐" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 py-3 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <Menu className="w-6 h-6 text-white cursor-pointer hover:text-orange-400 transition-colors" />
                    <div className="text-2xl sm:text-3xl font-bold">
                        <span className="text-white">Game </span>
                        <span className="text-white">Funded</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg">
                            Register
                        </button>
                        <button className="text-white px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium hover:text-orange-400 transition-colors hidden sm:block">
                            Login
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-full py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 border border-slate-700"
                    />
                    <Mic className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 cursor-pointer hover:text-orange-400 transition-colors" />
                </div>
            </div>

            {/* Navigation Icons */}
            <div className="bg-white px-2 sm:px-4 lg:px-8 py-4 flex border-b border-slate-200 overflow-x-auto shadow-sm">
                <button className="flex flex-col items-center gap-1 min-w-[60px] text-slate-700 hover:text-teal-600 transition-colors">
                    <Tv className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs font-medium">Live</span>
                </button>
                <button className="flex flex-col items-center gap-1 min-w-[60px] text-slate-700 hover:text-teal-600 transition-colors">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs font-medium">Sports</span>
                </button>
            </div>

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
                        Double Odds On
                    </h2>
                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        Goalscorer Bets
                    </h3>
                    <p className="text-white text-sm sm:text-base opacity-90">
                        if he scores two or more
                    </p>
                </div>
                <div className="absolute right-2 sm:right-4 lg:right-12 top-1/2 transform -translate-y-1/2">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <div className="text-4xl sm:text-6xl lg:text-7xl">
                            ⚽
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden sm:block">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <line
                            x1="0"
                            y1="50"
                            x2="100"
                            y2="50"
                            stroke="white"
                            strokeWidth="2"
                        />
                        <line
                            x1="50"
                            y1="0"
                            x2="50"
                            y2="100"
                            stroke="white"
                            strokeWidth="2"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="15"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>

            {/* Live Scores */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 space-y-3 shadow-sm">
                {liveScores.map((match, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-lg transition-colors"
                    >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="text-xl sm:text-2xl flex-shrink-0">
                                {match.homeLogo}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-semibold text-xs sm:text-sm truncate text-slate-800">
                                    {match.home}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 flex-shrink-0">
                            <span className="text-xl sm:text-2xl font-bold text-slate-900">
                                {match.scoreHome}
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-slate-400">
                                :
                            </span>
                            <span className="text-xl sm:text-2xl font-bold text-slate-900">
                                {match.scoreAway}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
                            <div className="flex flex-col items-end min-w-0">
                                <span className="font-semibold text-xs sm:text-sm truncate text-slate-800">
                                    {match.away}
                                </span>
                            </div>
                            <div className="text-xl sm:text-2xl flex-shrink-0">
                                {match.awayLogo}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-slate-200 flex shadow-sm">
                <button
                    onClick={() => setActiveTab("highlights")}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        activeTab === "highlights"
                            ? "text-teal-600 border-b-2 border-teal-600"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    Highlights
                </button>
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        activeTab === "upcoming"
                            ? "text-teal-600 border-b-2 border-teal-600"
                            : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    Upcoming
                </button>
            </div>

            {/* Sports Filter */}
            <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto border-b border-slate-200 shadow-sm">
                <button
                    onClick={() => setActiveSport("soccer")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                        activeSport === "soccer"
                            ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                    ⚽ Soccer
                </button>
                <button
                    onClick={() => setActiveSport("basketball")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                        activeSport === "basketball"
                            ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                    🏀 Basketball
                </button>
                <button
                    onClick={() => setActiveSport("tennis")}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                        activeSport === "tennis"
                            ? "bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                    🎾 Tennis
                </button>
            </div>

            {/* Matches List */}
            <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {matches.map((match, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all border border-slate-200"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0"></div>
                                    <span className="text-xs text-slate-600 truncate font-medium">
                                        {match.league}
                                    </span>
                                </div>
                                <span className="text-xs font-semibold text-orange-600 whitespace-nowrap ml-2">
                                    {match.time}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm mb-1 truncate text-slate-800">
                                        {match.home}
                                    </div>
                                    <div className="font-semibold text-sm truncate text-slate-800">
                                        {match.away}
                                    </div>
                                </div>
                                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                                    {match.odds.map((odd, i) => (
                                        <button
                                            key={i}
                                            className="bg-slate-100 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 hover:border-teal-300 border border-slate-200 px-2 sm:px-4 py-2 rounded-lg text-sm font-bold min-w-[50px] sm:min-w-[60px] transition-all"
                                        >
                                            <div className="text-xs text-slate-500 mb-0.5">
                                                {i === 0
                                                    ? "1"
                                                    : i === 1
                                                    ? "X"
                                                    : "2"}
                                            </div>
                                            <div className="text-slate-900">
                                                {odd}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Leagues Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-800">
                    Top League
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-3">
                    {topLeagues.map((league, idx) => (
                        <button
                            key={idx}
                            className="bg-white rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl flex flex-col items-center gap-2 transition-all hover:scale-105 border border-slate-200"
                        >
                            <div className="text-2xl sm:text-3xl">
                                {league.icon}
                            </div>
                            <span className="text-xs text-center font-medium text-slate-700">
                                {league.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-8 mt-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-4 bg-slate-700 rounded"></div>
                        <span className="text-sm">English</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mb-4 text-xs sm:text-sm">
                        <a
                            href="#"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Payment methods
                        </a>
                        <a
                            href="#"
                            className="hover:text-orange-400 transition-colors"
                        >
                            Terms & conditions
                        </a>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 text-center mb-4 max-w-2xl mx-auto">
                        We use cookies and third party cookies to improve our
                        services, analyse and personalise your preferences and
                        to show you advertisements.
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <div className="text-xs sm:text-sm border border-orange-500 text-orange-400 rounded-full px-2 py-1">
                            18+
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold mb-2">
                            <span className="text-white">Game </span>
                            <span className="text-white">Funded</span>
                            <span className="text-white">.</span>
                        </div>
                        <p className="text-xs text-slate-400">
                            Betco. © 2025 All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
