"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO, Reveal, RevealGroup, staggerItem } from "@/components/ui/motion";

/**
 * A real sequence, so the route line encodes something.
 *
 * These were four parallel capabilities (fare / verified / tracking / rent)
 * laid out as a 2x2 grid. Drawn on a line they would have asserted an order
 * that did not exist. The product genuinely is a journey, so the copy now
 * follows one and the markup is an <ol>. Every claim is unchanged.
 */
const stops = [
  { title: "Say where you're going", body: "Open the app and set your destination." },
  { title: "See the fare first", body: "The price is on screen before you confirm." },
  { title: "Match with a verified driver", body: "Drivers are checked before they can pick up." },
  { title: "Track it to the door", body: "Live tracking from pickup to arrival." },
] as const;

const routeLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
};

const routeLineVertical: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
};

const stopsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.22 } },
};

export function MartoShowcase() {
  return (
    <section
      data-cam="3"
      id="marto"
      aria-labelledby="marto-heading"
      className="relative isolate overflow-hidden bg-brand-ink text-white"
    >
      {/*
        The section ground is Freetown itself rather than a gradient. Scrimmed
        hard toward --brand-ink so body copy still clears AA on top of it.
      */}
      <Image
        src="/photos/freetown-road.webp"
        alt=""
        aria-hidden="true"
        fill
        priority={false}
        sizes="100vw"
        className="-z-30 object-cover object-center opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-ink/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/70"
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.62fr)] lg:items-center lg:gap-16">
          <RevealGroup>
            <motion.div data-motion="" variants={staggerItem} className="flex items-center gap-4">
              <span className="h-px w-10 bg-brand" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-heading text-brand">
                Flagship product
              </p>
            </motion.div>

            <motion.h2
              data-motion=""
              id="marto-heading"
              variants={staggerItem}
              className="mt-6 max-w-xl text-balance text-[clamp(2.25rem,7vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              Marto. Know the fare before you get in.
            </motion.h2>

            <motion.p
              data-motion=""
              variants={staggerItem}
              className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
            >
              One app for getting around Freetown. Book a driver for today, or a car for
              longer. Every step is built to be obvious, not clever.
            </motion.p>

            <motion.ul
              data-motion=""
              variants={staggerItem}
              className="mt-7 flex flex-wrap gap-2"
              aria-label="Two ways to use Marto"
            >
              {["Book a ride now", "Rent a car for longer"].map((mode) => (
                <li
                  key={mode}
                  className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white/80"
                >
                  {mode}
                </li>
              ))}
            </motion.ul>

            <motion.a
              data-motion=""
              variants={staggerItem}
              href="https://getmarto.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition-[background-color,transform] duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              Explore Marto
              <ArrowUpRight size={18} aria-hidden="true" />
            </motion.a>
          </RevealGroup>

          <Reveal className="flex justify-center lg:justify-end">
            <div className="relative w-fit">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-10 -z-10 h-3/4 rounded-full bg-brand/25 blur-3xl"
              />
              <Image
                src="/screen-rider-home.webp"
                alt="Marto rider app home screen showing ride and car-rental options in Freetown"
                width={640}
                height={1314}
                sizes="(max-width: 1023px) 60vw, 280px"
                className="w-48 drop-shadow-[0_2.5rem_4rem_rgb(0_0_0_/_0.55)] sm:w-56 lg:w-[17rem]"
              />
            </div>
          </Reveal>
        </div>

        {/*
          Second band. No other section on the page has one, at any breakpoint,
          which is what stops the three product sections reading as one template.
        */}
        <RevealGroup variants={stopsContainer} className="relative mt-20">
          <motion.span
            data-motion=""
            aria-hidden="true"
            variants={routeLineVertical}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brand to-brand/0 lg:hidden"
          />
          <motion.span
            data-motion=""
            aria-hidden="true"
            variants={routeLine}
            className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-brand via-brand/60 to-brand/0 lg:block"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {stops.map((stop) => (
              <motion.li
                data-motion=""
                key={stop.title}
                variants={staggerItem}
                className="relative pl-8 lg:pl-0 lg:pt-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-brand bg-brand-ink lg:top-0"
                />
                <h3 className="text-base font-semibold">{stop.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{stop.body}</p>
              </motion.li>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
