"use client";

import { useEffect, useState } from "react";

/**
 * useScrollSpy - Detects which section is currently active based on scroll position.
 *
 * Uses IntersectionObserver with rootMargin to detect which section's top edge
 * is closest to or within 100px below the top of the viewport (offset by navbar height).
 *
 * @param sectionIds - Array of section element IDs to observe
 * @param offset - Offset from the top of the viewport in pixels (default: 64, the navbar height)
 * @returns The id of the currently active section, or null if unavailable
 */
export function useScrollSpy(
    sectionIds: string[],
    offset: number = 64
): string | null {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        // Gracefully handle IntersectionObserver unavailability
        if (typeof IntersectionObserver === "undefined") {
            return;
        }

        const threshold = 100;

        // Track which sections are currently intersecting
        const visibleSections = new Map<string, IntersectionObserverEntry>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        visibleSections.set(id, entry);
                    } else {
                        visibleSections.delete(id);
                    }
                });

                // Determine which visible section is closest to the top of the viewport
                if (visibleSections.size > 0) {
                    let closestId: string | null = null;
                    let closestDistance = Infinity;

                    visibleSections.forEach((entry, id) => {
                        const rect = entry.target.getBoundingClientRect();
                        const distanceFromTop = Math.abs(rect.top - offset);

                        if (distanceFromTop < closestDistance) {
                            closestDistance = distanceFromTop;
                            closestId = id;
                        }
                    });

                    if (closestId) {
                        setActiveId(closestId);
                    }
                }
            },
            {
                // rootMargin: negative top margin to account for navbar, large bottom to observe
                // sections that are in the viewport area below the navbar
                // The top margin is -(offset)px so we ignore anything hidden behind the navbar
                // The bottom margin is negative to create a detection zone near the top
                rootMargin: `-${offset}px 0px -${Math.max(0, window.innerHeight - offset - threshold)}px 0px`,
                threshold: [0, 0.1, 0.25, 0.5],
            }
        );

        // Observe all section elements
        const elements: Element[] = [];
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
                elements.push(element);
            }
        });

        // Set initial active section if none detected yet
        if (elements.length > 0 && !activeId) {
            // Find the section closest to the top on initial load
            let closestId: string | null = null;
            let closestDistance = Infinity;

            elements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const distanceFromTop = Math.abs(rect.top - offset);

                if (distanceFromTop < closestDistance) {
                    closestDistance = distanceFromTop;
                    closestId = element.id;
                }
            });

            if (closestId) {
                setActiveId(closestId);
            }
        }

        return () => {
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionIds.join(","), offset]);

    return activeId;
}
