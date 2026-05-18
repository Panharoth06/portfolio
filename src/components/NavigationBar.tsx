"use client";

import { useCallback, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Home, Cpu, FolderOpen } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavLink {
    label: string;
    href: string;
}

const NAV_ICONS: Record<string, LucideIcon> = {
    Home,
    Skills: Cpu,
    Projects: FolderOpen,
};

interface NavigationBarProps {
    links: NavLink[];
}

const NAVBAR_HEIGHT = 64;

export function NavigationBar({ links }: NavigationBarProps) {
    const sectionIds = links.map((link) => link.href.replace("#", ""));
    const activeId = useScrollSpy(sectionIds, NAVBAR_HEIGHT);
    const scrollingRef = useRef(false);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const targetId = href.replace("#", "");
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            // Only use smooth scroll on larger screens
            const isMobile = window.innerWidth < 768;

            if (!isMobile && window.lenis) {
                if (scrollingRef.current) {
                    window.lenis.stop();
                    window.lenis.start();
                }
                scrollingRef.current = true;
                window.lenis.scrollTo(targetElement, {
                    offset: -NAVBAR_HEIGHT,
                    duration: 0.6,
                    onComplete: () => { scrollingRef.current = false; },
                });
            } else {
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.scrollY -
                    NAVBAR_HEIGHT;
                window.scrollTo({ top: targetPosition, behavior: isMobile ? "auto" : "smooth" });
            }
        },
        []
    );

    const handleHomeClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const isMobile = window.innerWidth < 768;

            if (!isMobile && window.lenis) {
                if (scrollingRef.current) {
                    window.lenis.stop();
                    window.lenis.start();
                }
                scrollingRef.current = true;
                window.lenis.scrollTo(0, {
                    duration: 0.6,
                    onComplete: () => { scrollingRef.current = false; },
                });
            } else {
                window.scrollTo({ top: 0, behavior: isMobile ? "auto" : "smooth" });
            }
        },
        []
    );

    return (
        <nav
            aria-label="Main navigation"
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="flex items-center gap-1 px-3 py-2 rounded-2xl backdrop-blur-lg bg-background/80 border border-border/40 shadow-lg">
                {/* Avatar / Home link */}
                <a
                    href="#hero"
                    onClick={handleHomeClick}
                    aria-label="Go to top"
                    className="flex-shrink-0 w-9 h-9 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary mr-1"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/cat.png"
                        alt="Panharoth"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-cover rounded-xl"
                    />
                </a>

                {/* Divider */}
                <div className="w-px h-5 bg-border/60 mx-1" aria-hidden="true" />

                {/* Nav icon links */}
                {links.map((link) => {
                    const linkId = link.href.replace("#", "");
                    const isActive = activeId === linkId;
                    const Icon = NAV_ICONS[link.label];

                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            title={link.label}
                            aria-label={link.label}
                            className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            {Icon && <Icon className="w-[18px] h-[18px]" />}
                            {/* Tooltip — desktop only */}
                            <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover text-popover-foreground text-xs px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden md:block">
                                {link.label}
                            </span>
                        </a>
                    );
                })}

                {/* Divider */}
                <div className="w-px h-5 bg-border/60 mx-1" aria-hidden="true" />

                {/* Theme toggle */}
                <ThemeToggle />
            </div>
        </nav>
    );
}
