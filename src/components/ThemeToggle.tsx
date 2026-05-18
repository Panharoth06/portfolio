"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggle } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            onClick={toggle}
            aria-label="Toggle color mode"
            className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className ?? ""}`}
        >
            {/* Render nothing until mounted to avoid hydration mismatch */}
            {mounted && (
                theme === "dark" ? (
                    <Sun className="h-5 w-5 text-foreground" />
                ) : (
                    <Moon className="h-5 w-5 text-foreground" />
                )
            )}
        </button>
    );
}
