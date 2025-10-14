import React, { useState } from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/scroll_top";
import HomePage from "./pages/home_page";

function App() {
    const [isUserAdmin] = useState(false);
    const isProduction = import.meta.env.MODE === "production";

    // Selecciona el router según el entorno
    const RouterComponent = isProduction ? HashRouter : BrowserRouter;

    return (
        <RouterComponent>
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<HomePage />} />
                {isUserAdmin && (
                    <Route
                        path="/admin"
                        element={<div>Panel de administrador</div>}
                    />
                )}
            </Routes>
        </RouterComponent>
    );
}

export default App;
