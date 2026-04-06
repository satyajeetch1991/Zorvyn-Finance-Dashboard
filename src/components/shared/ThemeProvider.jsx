import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";

const ThemeContext = createContext({
    theme: "system",
    resolvedTheme: "light",
    setTheme: () => undefined,
});

function getSystemTheme() {
    if (typeof window === "undefined")
        return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children, defaultTheme = "system" }) {
    const [theme, setTheme] = useState(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState(getSystemTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const nextResolved = theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;
            setResolvedTheme(nextResolved);

            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(nextResolved);
        };

        applyTheme();
        mediaQuery.addEventListener("change", applyTheme);

        return () => {
            mediaQuery.removeEventListener("change", applyTheme);
        };
    }, [theme]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
