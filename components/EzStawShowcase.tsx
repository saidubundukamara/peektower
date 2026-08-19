"use client";

import { ArrowUpRight, MessagesSquare, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { RevealGroup, staggerItem } from "@/components/ui/motion";
import { EzStawStoreMock } from "@/components/showcase/EzStawStoreMock";

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
    <section id="ezstaw" className="relative isolate overflow-hidden bg-ez-surface text-ez-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -left-32 -top-24 h-[32rem] w-[32rem] rounded-full bg-ez-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -right-24 bottom-0 h-72 w-72 rounded-full border border-ez-accent/20"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.72fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-28">
        <RevealGroup>
          <motion.div data-motion="" variants={staggerItem} className="flex items-center gap-4">
            <span className="h-px w-10 bg-ez-accent" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-ez-accent-strong">
              Commerce platform
            </p>
          </motion.div>

          <motion.h2 data-motion=""
            variants={staggerItem}
            className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,7vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          >
            EzStaw. A shop online in under a minute.
          </motion.h2>
          <motion.p data-motion=""
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-7 text-ez-muted sm:text-lg sm:leading-8"
          >
            Everything a merchant needs to sell online in Sierra Leone. No design skills, no
            card required. Tell EzStaw what you sell and start taking orders the same day.
          </motion.p>

          <motion.ul data-motion=""
            variants={listContainer}
            className="mt-8 divide-y divide-ez-ink/12 border-y border-ez-ink/12"
          >
            {ezStawFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.li data-motion=""
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
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ez-muted">{feature.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.a data-motion=""
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

        {/*
          No Reveal wrapper: the mock runs its own entrance sequence, and
          fading the whole thing in first would just delay the build.
        */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-fit">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] bottom-[3%] -z-10 h-[80%] rounded-full bg-ez-accent/20 blur-3xl"
            />

            <EzStawStoreMock />

            <p className="absolute -bottom-4 right-2 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-ez-ink shadow-xl sm:right-4">
              <span className="inline-flex h-2 w-2 rounded-full bg-ez-accent" aria-hidden="true" />
              Live in 60s
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
