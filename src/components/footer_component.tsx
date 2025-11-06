const FooterComponent = () => {
    return (
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
                    services, analyse and personalise your preferences and to
                    show you advertisements.
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
    );
};
export default FooterComponent;
