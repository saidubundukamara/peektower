"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useRef } from "react";
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
