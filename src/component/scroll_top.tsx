import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 10, behavior: "smooth" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    return null;
};

export default ScrollToTop;
