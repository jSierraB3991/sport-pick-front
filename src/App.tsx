import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home_page";

function App() {
    const [isUserAdmin] = useState(false);

    // Selecciona el router según el entorno
    const RouterComponent = BrowserRouter;

    return (
        <RouterComponent>
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
