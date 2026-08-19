"use client";

import { ArrowUpRight, CloudOff, Code2, Landmark, RadioTower } from "lucide-react";
import { motion } from "motion/react";
import { RevealGroup, staggerItem } from "@/components/ui/motion";
import { OpenJusticeDashboardMock } from "@/components/showcase/OpenJusticeDashboardMock";

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border border-oj-accent/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -left-24 bottom-10 h-72 w-72 rounded-full bg-oj-accent/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[minmax(19rem,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-28">
        {/*
          No Reveal wrapper and no Parallax: the mock runs its own sequence, and
          scroll-linked drift on top of a state machine reads as two unrelated
          things moving at once. The "Works offline" pill is gone too — the
          dashboard now demonstrates that rather than labelling it.
        */}
        <div className="order-2 lg:order-1">
          <OpenJusticeDashboardMock />
        </div>

        <RevealGroup className="order-1 lg:order-2">
          <motion.div data-motion="" variants={staggerItem} className="flex items-center gap-4">
            <span className="h-px w-10 bg-oj-accent-strong" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-oj-accent-strong">
              Digital Public Good
            </p>
          </motion.div>

          <motion.h2 data-motion=""
            variants={staggerItem}
            className="mt-5 max-w-3xl text-balance text-[clamp(2.25rem,7vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          >
            OpenJustice. Records that keep working when the network doesn&apos;t.
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
