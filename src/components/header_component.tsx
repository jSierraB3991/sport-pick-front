import { Menu, Search } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router-dom";
import "../style/header.css";
import LoadingBarComponent from "./loading_bar_component";

export interface HeaderParams {
    loading: boolean;
    userType: string;
    showSearchBar: boolean;
    setSearch: (search: string) => void;
}

const HeaderComponent = ({ loading, setSearch, userType = "public", showSearchBar = false }: HeaderParams): JSX.Element => {
    return (
        <>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 sm:px-6 lg:px-8 py-3 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <Menu className="w-6 h-6 text-white cursor-pointer hover:text-orange-400 transition-colors" />
                    {userType === "public" && (
                        <div className="flex gap-2">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg">
                                Register
                            </button>
                            <Link
                                className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all"
                                to="/login">
                                Ir a Login
                            </Link>
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
            {loading && <LoadingBarComponent />};
        </>
    );
};

export default HeaderComponent;
