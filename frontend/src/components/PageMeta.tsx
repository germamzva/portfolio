import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageMeta = {
    "/": {
        title: "Home",
        description: "Welcome to my personal portfolio website.",
    },
    "/about": {
        title: "About Me",
        description: "Learn more about my experience, skills, and background.",
    },
    "/projects": {
        title: "List of my Projects",
        description: "Explore my web development projects and portfolio.",
    },
    "/contact": {
        title: "Contact Us",
        description:
            "Get in touch with me for web development projects and opportunities.",
    },
};

export default function PageMeta() {
    const { pathname } = useLocation();

    useEffect(() => {
        const meta = pageMeta[pathname as keyof typeof pageMeta];

        if (!meta) return;

        document.title = meta.title;

        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", meta.description);
    }, [pathname]);

    return null;
}