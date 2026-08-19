"use client";

import { Check, CloudOff, RefreshCw, Wifi } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO, useEnterOnce, useTimeline } from "@/components/ui/motion";

/**
 * A dashboard that loses the network and recovers.
 *
 * OpenJustice's whole argument is "keep working through outages and sync safely
 * when connectivity returns". A still screenshot can only assert that. This
 * plays the outage once, then rests in the synced state — it does not loop,
 * because an indefinite auto-playing animation mid-page is a distraction
 * machine and fails WCAG 2.2.2.
 *
 * It also replaces a raster mockup whose dominant colour was #1348e5, a bright
 * blue sitting inside a section built on green.
 *
 * Decorative. The caption underneath carries the same information as text, so
 * nothing here is load-bearing for a screen reader.
 */

// Real figures from the dashboard this replaces.
const STATS = [
  { label: "Active cases", value: "3", note: "0 critical" },
  { label: "Person records", value: "4", note: "1 wanted" },
  { label: "Evidence items", value: "1", note: "0 sealed" },
  { label: "Stale cases", value: "0", note: "none over 30 days" },
] as const;

// Generic entity types rather than invented case numbers.
const ROWS = [
  { entity: "Case update", queues: true },
  { entity: "Person record", queues: true },
  { entity: "Evidence item", queues: true },
  { entity: "Station report", queues: false },
] as const;

const NAV = ["Dashboard", "Cases", "Persons", "Evidence", "Officers", "Stations"] as const;

// offline at 1.0s, syncing at 2.8s, back online at 4.4s
const TIMELINE = [1000, 2800, 4400] as const;

const STATES = [
  { key: "online", Icon: Wifi, label: "Online · Synced" },
  { key: "offline", Icon: CloudOff, label: "Offline · 3 records queued" },
  { key: "syncing", Icon: RefreshCw, label: "Syncing…" },
  { key: "online", Icon: Check, label: "Online · All records synced" },
] as const;

export function OpenJusticeDashboardMock() {
  const { ref, started } = useEnterOnce();
  const reduced = useReducedMotion() ?? false;
  const step = useTimeline(TIMELINE, started, reduced);

  const state = STATES[Math.min(step, STATES.length - 1)];
  const isOffline = state.key === "offline";
  const isSyncing = state.key === "syncing";

  return (
    <div ref={ref}>
      <div
        aria-hidden="true"
        className="relative rounded-2xl bg-oj-ink p-2 shadow-[0_2rem_5rem_rgb(16_37_31_/_0.2)] sm:p-3"
      >
        <div className="flex items-center gap-2 px-2 pb-3 pt-1">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 h-5 flex-1 rounded-full bg-white/8" />
        </div>

        <div className="overflow-hidden rounded-lg bg-white">
          <div className="flex">
            <div className="hidden w-28 shrink-0 flex-col gap-1 bg-oj-ink/95 p-2.5 sm:flex">
              <p className="px-1.5 pb-1 text-[10px] font-bold tracking-heading text-white/70">
                CRMS
              </p>
              {NAV.map((item, i) => (
                <p
                  key={item}
                  className={`rounded px-1.5 py-1 text-[10px] ${
                    i === 0 ? "bg-white/12 text-white" : "text-white/45"
                  }`}
                >
                  {item}
                </p>
              ))}
            </div>

            <div className="min-w-0 flex-1 p-3 sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-bold text-oj-ink">Dashboard</p>

                {/* The state machine's visible output. */}
                <motion.span data-motion=""
                  key={`${state.key}-${step}`}
                  initial={reduced ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    isOffline
                      ? "bg-oj-ink/8 text-oj-muted"
                      : "bg-oj-accent-strong/12 text-oj-accent-strong"
                  }`}
                >
                  <state.Icon
                    size={11}
                    strokeWidth={2.4}
                    className={isSyncing && !reduced ? "animate-spin" : ""}
                  />
                  {state.label}
                </motion.span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="rounded-md border border-oj-ink/10 p-2">
                    <p className="text-[9px] leading-tight text-oj-muted">{stat.label}</p>
                    <p className="mt-0.5 text-base font-bold leading-none text-oj-ink">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[8px] leading-tight text-oj-muted">{stat.note}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-3 overflow-hidden rounded-md border border-oj-ink/10">
                {/* Sweep that runs the length of the table as records flush. */}
                {isSyncing && !reduced ? (
                  <motion.span data-motion=""
                    className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left bg-oj-accent-strong"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
                  />
                ) : null}

                {ROWS.map((row, i) => {
                  const queued = isOffline && row.queues;
                  const flushing = isSyncing && row.queues;

                  return (
                    <div
                      key={row.entity}
                      style={{ transitionDelay: flushing ? `${i * 180}ms` : "0ms" }}
                      className={`flex items-center justify-between gap-2 border-b border-oj-ink/8 px-2.5 py-2 transition-opacity duration-300 last:border-b-0 ${
                        queued ? "opacity-60" : "opacity-100"
                      }`}
                    >
                      <p className="truncate text-[10px] text-oj-ink">{row.entity}</p>
                      {queued ? (
                        <span className="flex items-center gap-1 text-[9px] text-oj-muted">
                          <span className="h-2 w-2 rounded-full border border-oj-muted" />
                          Queued
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[9px] text-oj-accent-strong">
                          <Check size={9} strokeWidth={3} />
                          Saved
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        Not aria-hidden. This is what the animation is saying, in words, for
        anyone who cannot see it or who scrolls past mid-sequence.
      */}
      <p className="mt-5 max-w-md text-sm leading-6 text-oj-muted">
        Officers keep working through an outage. Records queue on the device and
        sync when the network comes back.
      </p>
    </div>
  );
}
