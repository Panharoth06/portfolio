"use client";
import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Only enable smooth scroll on md+ screens (768px and above)
    if (window.innerWidth < 768) return;

    const lenis = new Lenis();
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return null;
}
