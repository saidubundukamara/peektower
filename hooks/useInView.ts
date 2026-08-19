"use client";

import { useEffect, useRef, useState } from "react";

export function useInView() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setIsInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsInView(true);
        observer.unobserve(entry.target);
      },
      // Fire slightly *before* the element enters, and on any sliver of it. The
      // old "-10% / 0.12" pair needed 12% of a tall section visible past a
      // shrunk root, so a fast scroll could land inside a section that had not
      // revealed yet and show it blank.
      { rootMargin: "0px 0px 15%", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { elementRef, isInView };
}
