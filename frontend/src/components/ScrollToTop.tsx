import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/contact") {
            document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}