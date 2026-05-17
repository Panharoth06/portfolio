"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type ColorMode = "light" | "dark";

interface ThemeContextValue {
    theme: ColorMode;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPreference(): ColorMode {
    try {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        return mq.matches ? "dark" : "light";
    } catch {
        return "dark";
    }
}

function readInitialTheme(): ColorMode {
    // Read the class already applied to <html> by the inline script (Requirement 7.5)
    const htmlClass = document.documentElement.className;
    if (htmlClass === "light" || htmlClass === "dark") {
        return htmlClass;
    }
    // Fallback: check localStorage, then system preference
    try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            return stored;
        }
    } catch {
        // localStorage unavailable
    }
    return getSystemPreference();
}

function persistTheme(theme: ColorMode): void {
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // localStorage unavailable — memory-only mode
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ColorMode>(() => {
        // During SSR, default to "dark" — will be corrected on hydration
        if (typeof window === "undefined") return "dark";
        return readInitialTheme();
    });

    // Sync state with the actual <html> class on mount (handles hydration mismatch)
    useEffect(() => {
        const initial = readInitialTheme();
        setTheme(initial);
    }, []);

    const toggle = useCallback(() => {
        setTheme((prev) => {
            const next: ColorMode = prev === "dark" ? "light" : "dark";
            const root = document.documentElement;

            // Add a transition class so themed properties animate during the swap.
            // Removed shortly after to avoid affecting hover/interaction transitions.
            root.classList.add("theme-transitioning");
            root.classList.remove(prev);
            root.classList.add(next);
            persistTheme(next);

            window.setTimeout(() => {
                root.classList.remove("theme-transitioning");
            }, 350);

            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
