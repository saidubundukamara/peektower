"use client";

import { ShieldCheck, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT_EXPO, useEnterOnce } from "@/components/ui/motion";

/**
 * A storefront that builds itself.
 *
 * EzStaw's claim is temporal — "describe what you sell and your store is built,
 * styled, and live in under a minute" — and a screenshot cannot show a claim
 * about time. This assembles once when the section arrives, which is the claim
 * demonstrated rather than asserted.
 *
 * It replaces a raster mockup whose dominant colours were #7a021d and #c69a3b,
 * maroon and gold sitting inside a section whose accent is #ea580c. The store
 * is still the merchant's own brand, just one that stops fighting the page.
 *
 * Decorative: every fact here also appears in the visible feature list beside
 * it, so the whole thing is aria-hidden.
 */

// Verbatim from the storefront this replaces — nothing invented.
const PRODUCTS = [
  { name: "Ankara Dress", price: "Le 180", emoji: "\u{1F457}", tint: "bg-[#f6d9c4]" },
  { name: "Men's Shirt", price: "Le 150", emoji: "\u{1F454}", tint: "bg-[#d8e6dd]" },
  { name: "Handbag", price: "Le 120", emoji: "\u{1F45C}", tint: "bg-[#f2e0bd]" },
  { name: "Slide Sandal", price: "Le 80", emoji: "\u{1F461}", tint: "bg-[#e6dced]" },
] as const;

const part: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_OUT_EXPO } },
};

const tile: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.34, ease: EASE_OUT_EXPO } },
};

const BUILD_MS = 1250;

export function EzStawStoreMock() {
  const { ref, started } = useEnterOnce();
  const reduced = useReducedMotion() ?? false;

  // MotionConfig reducedMotion="user" strips the transforms but still honours
  // stagger delays, so the sequence has to be collapsed here explicitly.
  const frame: Variants = {
    hidden: {},
    show: {
      transition: reduced
        ? {}
        : { staggerChildren: 0.1, delayChildren: 0.12 },
    },
  };

  const tiles: Variants = {
    hidden: {},
    show: { transition: reduced ? {} : { staggerChildren: 0.07 } },
  };

  return (
    <motion.div
      ref={ref}
      data-motion=""
      aria-hidden="true"
      initial="hidden"
      animate={started ? "show" : "hidden"}
      variants={frame}
      className="relative w-[15rem] shrink-0 select-none rounded-[2.1rem] border-[7px] border-ez-ink bg-white p-3 shadow-[0_2rem_4rem_rgb(61_30_10_/_0.28)] sm:w-[16.5rem]"
    >
      {/* Fills as the store assembles: the "under a minute" claim, made literal. */}
      <span className="absolute inset-x-6 top-[3px] h-[3px] overflow-hidden rounded-full bg-ez-ink/10">
        <motion.span data-motion=""
          className="block h-full w-full origin-left rounded-full bg-ez-accent"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={
            started
              ? reduced
                ? { scaleX: 1, opacity: 0 }
                : { scaleX: 1, opacity: [1, 1, 0] }
              : { scaleX: 0 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: BUILD_MS / 1000, ease: EASE_OUT_EXPO, times: [0, 0.85, 1] }
          }
        />
      </span>

      <motion.div data-motion="" variants={part} className="mt-3 flex items-start justify-between gap-2">
        <p className="text-[15px] font-bold leading-tight text-ez-ink">
          Zainab&apos;s
          <br />
          Fashion
        </p>
        <span className="relative mt-0.5 text-ez-ink">
          <ShoppingBag size={19} strokeWidth={1.9} />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ez-accent text-[10px] font-bold text-white">
            1
          </span>
        </span>
      </motion.div>

      <motion.div data-motion="" variants={part} className="mt-2">
        <p className="text-[13px] leading-snug text-ez-muted">Quality fits. Local style.</p>
        <p className="mt-0.5 text-[11px] text-ez-muted">Freetown, Sierra Leone</p>
      </motion.div>

      <motion.p data-motion=""
        variants={part}
        className="mt-3 rounded-lg bg-ez-accent/15 px-3 py-2 text-[12px] font-bold text-ez-ink"
      >
        New arrivals just in!
      </motion.p>

      <motion.p data-motion="" variants={part} className="mt-3 text-[12px] font-bold text-ez-ink">
        Featured products
      </motion.p>

      <motion.div data-motion="" variants={tiles} className="mt-2 grid grid-cols-2 gap-2">
        {PRODUCTS.map((product) => (
          <motion.div data-motion="" key={product.name} variants={tile}>
            <span
              className={`flex h-14 items-center justify-center rounded-lg text-2xl ${product.tint}`}
            >
              {product.emoji}
            </span>
            <p className="mt-1 text-[11px] font-semibold leading-tight text-ez-ink">
              {product.name}
            </p>
            <p className="text-[11px] text-ez-muted">{product.price}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p data-motion=""
        variants={part}
        className="mt-3 rounded-lg bg-ez-accent-strong py-2.5 text-center text-[13px] font-bold text-white"
      >
        Shop now
      </motion.p>

      <motion.p data-motion=""
        variants={part}
        className="mt-2 flex items-center gap-1.5 text-[11px] text-ez-muted"
      >
        <ShieldCheck size={13} strokeWidth={2} className="shrink-0 text-ez-accent-strong" />
        Payments held in escrow
      </motion.p>
    </motion.div>
  );
}
