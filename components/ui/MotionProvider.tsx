"use client";

import { MotionConfig } from "motion/react";
import { type ReactNode } from "react";

/**
 * App-wide Framer Motion config. `reducedMotion="user"` strips transform-based
 * movement (slides, parallax) for visitors who ask for reduced motion, while
 * still allowing gentle opacity fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
