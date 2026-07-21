"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  MapPinned,
  WalletCards,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Parallax, Reveal, RevealGroup, staggerItem } from "@/components/ui/motion";

const martoFeatures = [
  {
    title: "Know the fare upfront",
    description: "See what your trip costs before you confirm.",
    icon: WalletCards,
  },
  {
    title: "Ride with confidence",
    description: "Connect with verified drivers for everyday journeys.",
    icon: BadgeCheck,
  },
  {
    title: "Follow every trip",
    description: "Live tracking keeps the route clear from pickup to arrival.",
    icon: MapPinned,
  },
  {
    title: "Ride or rent",
    description: "Book a ride now or find a car for longer plans.",
    icon: CarFront,
  },
] as const;

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export function MartoShowcase() {
  return (
    <section id="marto" className="relative isolate overflow-hidden bg-black text-white">
      <Parallax
        aria-hidden="true"
        distance={60}
        className="absolute inset-y-0 right-0 -z-20 w-2/3 bg-[radial-gradient(circle_at_center,rgb(0_191_255_/_0.2),transparent_62%)]"
      />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-30 opacity-20" />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-8">
        <RevealGroup>
          <motion.div variants={staggerItem} className="flex items-center gap-4">
            <span className="h-px w-10 bg-brand" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-brand">
              Flagship product
            </p>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl"
          >
            Your Ride. <span className="text-white/45">Your Way.</span> Marto.
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
          >
            One app for getting around Freetown — book a driver for today or a car for longer.
            Every step is built to be obvious, not clever.
          </motion.p>

          <motion.ul
            variants={gridContainer}
            className="mt-8 grid gap-px overflow-hidden rounded-sm border border-white/15 bg-white/15 sm:grid-cols-2"
          >
            {martoFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.li
                  key={feature.title}
                  variants={staggerItem}
                  className="group bg-black/80 p-5 transition-colors duration-300 hover:bg-black/60"
                >
                  <Icon
                    className="text-brand transition-transform duration-300 group-hover:scale-110"
                    size={24}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="mt-5 font-semibold">{feature.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">{feature.description}</p>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.a
            variants={staggerItem}
            href="https://getmarto.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Explore Marto
            <ArrowUpRight size={18} aria-hidden="true" />
          </motion.a>
        </RevealGroup>

        <Reveal className="flex justify-center lg:justify-end">
          <Parallax distance={22} className="relative w-fit">
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-[2%] h-[82%] rounded-full bg-brand/20 blur-3xl"
            />
            <Image
              src="/screen-rider-home.png"
              alt="Marto rider app home screen showing ride and car-rental options in Freetown"
              width={1294}
              height={2657}
              sizes="(max-width: 1023px) 70vw, 300px"
              className="relative block h-auto w-52 max-w-full object-contain drop-shadow-[0_2.5rem_4rem_rgb(0_0_0_/_0.55)] sm:w-60 lg:w-auto lg:max-w-none lg:max-h-[calc(100svh-15rem)]"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
