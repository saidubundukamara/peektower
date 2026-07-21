"use client";

import { ArrowUpRight, MessagesSquare, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Parallax, Reveal, RevealGroup, staggerItem } from "@/components/ui/motion";

const ezStawFeatures = [
  {
    title: "A store in 60 seconds",
    description: "Describe what you sell and your store is built, styled, and live in under a minute.",
    icon: Sparkles,
  },
  {
    title: "Get paid your way",
    description: "Accept Orange Money and Afrimoney out of the box — no card, no setup fees.",
    icon: Wallet,
  },
  {
    title: "Payments held safe",
    description: "Escrow holds every payment until your customer confirms the order arrived.",
    icon: ShieldCheck,
  },
  {
    title: "Sell where you already chat",
    description: "Sync your store to the WhatsApp, Facebook, and Instagram you already sell on.",
    icon: MessagesSquare,
  },
] as const;

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export function EzStawShowcase() {
  return (
    <section id="ezstaw" className="relative overflow-hidden bg-ez-surface text-ez-ink">
      <Parallax
        aria-hidden="true"
        distance={70}
        className="absolute -left-32 -top-24 h-[32rem] w-[32rem] rounded-full bg-ez-accent/10 blur-3xl"
      />
      <Parallax
        aria-hidden="true"
        distance={-50}
        className="absolute -right-24 bottom-0 h-72 w-72 rounded-full border border-ez-accent/20"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.72fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-8">
        <RevealGroup>
          <motion.div variants={staggerItem} className="flex items-center gap-4">
            <span className="h-px w-10 bg-ez-accent" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-ez-accent-strong">
              Commerce platform
            </p>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl"
          >
            Your Store. <span className="text-ez-ink/45">Your Brand.</span> EzStaw.
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-7 text-ez-ink/65 sm:text-lg sm:leading-8"
          >
            Everything a merchant needs to sell online in Sierra Leone — no design skills, no card
            required. Tell EzStaw what you sell and start taking orders the same day.
          </motion.p>

          <motion.ul
            variants={listContainer}
            className="mt-8 divide-y divide-ez-ink/12 border-y border-ez-ink/12"
          >
            {ezStawFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.li
                  key={feature.title}
                  variants={staggerItem}
                  className="group grid grid-cols-[auto_1fr] gap-4 py-3.5"
                >
                  <Icon
                    className="mt-0.5 text-ez-accent-strong transition-transform duration-300 group-hover:scale-110"
                    size={23}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="mt-1 text-sm leading-6 text-ez-ink/60">{feature.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.a
            variants={staggerItem}
            href="https://ezstaw.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-ez-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-ez-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ez-accent-strong"
          >
            Explore EzStaw
            <ArrowUpRight size={18} aria-hidden="true" />
          </motion.a>
        </RevealGroup>

        <Reveal className="flex justify-center lg:justify-end">
          <Parallax distance={22} className="relative w-fit">
            <div
              aria-hidden="true"
              className="absolute inset-x-[10%] bottom-[3%] h-[80%] rounded-full bg-ez-accent/20 blur-3xl"
            />
            <Image
              src="/ezstaw-store.png"
              alt="EzStaw storefront on a phone showing Zainab's Fashion with products, prices in Leones, and escrow-protected checkout"
              width={508}
              height={1643}
              sizes="(max-width: 1023px) 55vw, 240px"
              className="relative block h-auto w-48 max-w-full object-contain drop-shadow-[0_2.5rem_4rem_rgb(61_30_10_/_0.28)] sm:w-56 lg:w-auto lg:max-w-none lg:max-h-[calc(100svh-15rem)]"
            />
            <div className="absolute -bottom-4 right-2 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ez-ink shadow-xl sm:right-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ez-accent opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ez-accent" />
              </span>
              Live in 60s
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
