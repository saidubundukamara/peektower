"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

export type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const { elementRef, isInView } = useInView();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isVisible = !isReady || isInView;

  return (
    <div
      ref={elementRef}
      className={`${className} transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out-expo)] motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
