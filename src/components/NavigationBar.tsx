"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavLink {
    label: string;
    href: string;
}

interface NavigationBarProps {
    links: NavLink[];
}

const NAVBAR_HEIGHT = 64;

export function NavigationBar({ links }: NavigationBarProps) {
    const sectionIds = links.map((link) => link.href.replace("#", ""));
    const activeId = useScrollSpy(sectionIds, NAVBAR_HEIGHT);
    const scrollingRef = useRef(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const targetId = href.replace("#", "");
            const targetElement = document.getElementById(targetId);

            if (!targetElement) return;

            // Close mobile menu if open
            setMobileMenuOpen(false);

            // Cancel any in-progress scroll animation
            if (window.lenis && scrollingRef.current) {
                window.lenis.stop();
                window.lenis.start();
            }

            scrollingRef.current = true;

            if (window.lenis) {
                window.lenis.scrollTo(targetElement, {
                    offset: -NAVBAR_HEIGHT,
                    duration: 0.6,
                    onComplete: () => {
                        scrollingRef.current = false;
                    },
                });
            } else {
                // Fallback to native scrollIntoView
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.scrollY -
                    NAVBAR_HEIGHT;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                scrollingRef.current = false;
            }
        },
        []
    );

    const handleHomeClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();

            // Close mobile menu if open
            setMobileMenuOpen(false);

            // Cancel any in-progress scroll animation
            if (window.lenis && scrollingRef.current) {
                window.lenis.stop();
                window.lenis.start();
            }

            scrollingRef.current = true;

            if (window.lenis) {
                window.lenis.scrollTo(0, {
                    duration: 0.6,
                    onComplete: () => {
                        scrollingRef.current = false;
                    },
                });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
                scrollingRef.current = false;
            }
        },
        []
    );

    // Close mobile menu on Escape key press
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                hamburgerRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [mobileMenuOpen]);

    // Close mobile menu on outside click
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(target)
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <nav
            aria-label="Main navigation"
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40"
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Home link - left side */}
                <a
                    href="#hero"
                    onClick={handleHomeClick}
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                    Panharoth
                </a>

                {/* Navigation links - center (hidden on mobile, shown on md+) */}
                <ul className="hidden md:flex items-center gap-1">
                    {links.map((link) => {
                        const linkId = link.href.replace("#", "");
                        const isActive = activeId === linkId;

                        return (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Right side: Theme toggle + Hamburger (mobile) */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    {/* Hamburger menu button - visible only on mobile */}
                    <button
                        ref={hamburgerRef}
                        type="button"
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle navigation menu"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile slide-down menu */}
            <div
                ref={mobileMenuRef}
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${mobileMenuOpen ? "max-h-64" : "max-h-0"
                    }`}
            >
                <ul className="px-6 pb-4 pt-2 flex flex-col gap-1 border-t border-border/40 bg-background/80 backdrop-blur-lg">
                    {links.map((link) => {
                        const linkId = link.href.replace("#", "");
                        const isActive = activeId === linkId;

                        return (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
