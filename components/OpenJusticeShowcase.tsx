"use client";

import { ArrowUpRight, CloudOff, Code2, Landmark, RadioTower } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Parallax, Reveal, RevealGroup, staggerItem } from "@/components/ui/motion";

const openJusticeFeatures = [
  {
    title: "Offline by default",
    description: "Keep working through outages and sync safely when connectivity returns.",
    icon: CloudOff,
  },
  {
    title: "Built for 2G and 3G",
    description: "USSD and WhatsApp access extend critical workflows beyond smartphones.",
    icon: RadioTower,
  },
  {
    title: "Ready for 54 countries",
    description: "Adapt identity systems, legal frameworks, and languages through configuration.",
    icon: Landmark,
  },
] as const;

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export function OpenJusticeShowcase() {
  return (
    <section id="openjustice" className="relative isolate overflow-hidden bg-oj-surface text-oj-ink">
      <Parallax
        aria-hidden="true"
        distance={-60}
        className="pointer-events-none absolute -z-10 -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border border-oj-accent/20"
      />
      <Parallax
        aria-hidden="true"
        distance={70}
        className="pointer-events-none absolute -z-10 -left-24 bottom-10 h-72 w-72 rounded-full bg-oj-accent/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(19rem,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-8">
        <Reveal className="order-2 lg:order-1">
          <Parallax distance={20}>
            <div className="relative rounded-2xl bg-oj-ink p-2 shadow-[0_2rem_5rem_rgb(16_37_31_/_0.2)] sm:p-3">
              <div className="flex items-center gap-2 px-2 pb-3 pt-1" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="ml-3 h-5 flex-1 rounded-full bg-white/8" />
              </div>
              <Image
                src="/openjustice-dashboard.png"
                alt="OpenJustice criminal records dashboard with case statistics and navigation"
                width={590}
                height={340}
                sizes="(max-width: 1023px) 100vw, 520px"
                className="h-auto w-full rounded-lg"
              />
              <div className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold shadow-xl sm:right-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oj-accent opacity-50 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-oj-accent-strong" />
                </span>
                Works offline
              </div>
            </div>
          </Parallax>
        </Reveal>

        <RevealGroup className="order-1 lg:order-2">
          <motion.div data-motion="" variants={staggerItem} className="flex items-center gap-4">
            <span className="h-px w-10 bg-oj-accent-strong" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-oj-accent-strong">
              Digital Public Good
            </p>
          </motion.div>

          <motion.h2 data-motion=""
            variants={staggerItem}
            className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl"
          >
            OpenJustice. <span className="text-oj-ink/45">Justice records that work anywhere.</span>
          </motion.h2>
          <motion.p data-motion=""
            variants={staggerItem}
            className="mt-5 max-w-xl text-base leading-7 text-oj-muted sm:text-lg sm:leading-8"
          >
            An open-source criminal records platform for law enforcement agencies across Africa.
            It runs on weak connections, keeps working offline, and leaves each country in control
            of its own data.
          </motion.p>

          <motion.ul data-motion=""
            variants={listContainer}
            className="mt-8 divide-y divide-oj-ink/12 border-y border-oj-ink/12"
          >
            {openJusticeFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.li data-motion=""
                  key={feature.title}
                  variants={staggerItem}
                  className="group grid grid-cols-[auto_1fr] gap-4 py-3.5"
                >
                  <Icon
                    className="mt-0.5 text-oj-accent-strong transition-transform duration-300 group-hover:scale-110"
                    size={23}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-oj-muted">{feature.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div data-motion="" variants={staggerItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://crms-inky.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-oj-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-oj-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oj-accent-strong"
            >
              Explore OpenJustice
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/PeekTower-HQ/crms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-oj-ink/25 px-6 py-3 text-sm font-bold transition-colors hover:border-oj-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oj-accent-strong"
            >
              <Code2 size={18} aria-hidden="true" />
              View source
            </a>
          </motion.div>
        </RevealGroup>
      </div>
    </section>
  );
}
