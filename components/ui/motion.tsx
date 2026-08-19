"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

// Shared easing — matches the CSS --ease-out-expo curve used elsewhere.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Column / block entrance: fade + rise.
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

// Container that staggers its children as it enters the viewport.
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

// Individual staggered item (feature rows, cards).
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/**
 * Fires once when the element reaches the viewport, and reports whether the
 * visitor asked for reduced motion.
 *
 * For sequences that are step machines rather than variant trees — where the
 * thing being animated is a change of *state* (a connection dropping, records
 * queueing) rather than a set of children arriving.
 */
export function useEnterOnce() {
  const { elementRef, isInView } = useInView();
  const reduced = useReducedMotion() ?? false;
  return { ref: elementRef, started: isInView, reduced };
}

/**
 * Walks through `timeline` (cumulative ms offsets) once, after `started`.
 * Returns the current step index. Under reduced motion it lands on the final
 * step immediately and runs no timers at all — the resting state is the point,
 * the journey to it is the decoration.
 *
 * Never loops: an indefinite auto-playing animation mid-page is a distraction
 * machine and fails WCAG 2.2.2.
 */
export function useTimeline(timeline: readonly number[], started: boolean, reduced: boolean) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!started || reduced) return;

    const timers = timeline.map((at, i) => window.setTimeout(() => setStep(i + 1), at));
    return () => timers.forEach(window.clearTimeout);
  }, [started, reduced, timeline]);

  // Derived rather than stored: under reduced motion there is no sequence to
  // run, so the resting step is simply what this returns.
  return reduced ? timeline.length : step;
}

type RevealProps = HTMLMotionProps<"div"> & { variants?: Variants };

/**
 * Single block that fades + rises into view once. Driven by the project's own
 * IntersectionObserver hook (reliable across SSR/hydration) rather than
 * Framer's whileInView, then hands the animation to Framer via `animate`.
 */
export function Reveal({ variants = revealUp, children, ...rest }: RevealProps) {
  const { elementRef, isInView } = useInView();
  return (
    <motion.div
      ref={elementRef}
      data-motion=""
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that reveals and staggers its motion children (feature rows,
 * headline, CTA). Child motion elements inherit the "show" label via Framer
 * variant propagation, so they only need `variants={staggerItem}`.
 */
export function RevealGroup({ variants = staggerContainer, children, ...rest }: RevealProps) {
  const { elementRef, isInView } = useInView();
  return (
    <motion.div
      ref={elementRef}
      data-motion=""
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type ParallaxProps = HTMLMotionProps<"div"> & {
  /** Total travel in px across the section's scroll pass (split ± around center). */
  distance?: number;
};

/**
 * Scroll-linked parallax for decorative / visual layers only (never body copy).
 * Translates the element on the Y axis as its section scrolls through the
 * viewport. No-ops when the user prefers reduced motion.
 */
export function Parallax({ distance = 40, style, children, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? style : { ...style, y, willChange: "transform" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
