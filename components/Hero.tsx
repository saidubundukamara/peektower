import { ArrowDownRight } from "lucide-react";
import { siteContent } from "@/data/site";
import { PlasmaBackground } from "@/components/PlasmaBackground";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-brand-ink text-white">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-20 opacity-35" />
      <PlasmaBackground />
      <div
        aria-hidden="true"
        className="hero-orbit absolute -right-28 top-24 -z-10 h-72 w-72 rounded-full border border-brand/35 sm:right-8 sm:h-[28rem] sm:w-[28rem]"
      />
      <div
        aria-hidden="true"
        className="absolute right-12 top-56 -z-10 h-24 w-24 rounded-full bg-brand/15 blur-2xl sm:right-48 sm:h-44 sm:w-44"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-24 lg:px-12 lg:pb-20">
        <div className="hero-reveal hero-reveal-1 flex items-center gap-4">
          <span className="h-px w-10 bg-brand" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-heading text-brand">
            {siteContent.location}
          </p>
        </div>

        <h1 className="hero-reveal hero-reveal-2 mt-7 max-w-5xl text-balance text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
          Building practical digital products <span className="text-white/45">from Sierra Leone.</span>
        </h1>

        <div className="hero-reveal hero-reveal-3 mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            {siteContent.positioning}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={siteContent.primaryCta.href}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition-[background-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-white hover:shadow-2xl hover:shadow-brand/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:scale-[0.98]"
            >
              {siteContent.primaryCta.label}
              <ArrowDownRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={siteContent.secondaryCta.href}
              className="group inline-flex min-h-12 items-center justify-center rounded-sm border border-white/35 px-6 py-3 text-sm font-bold text-white transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:scale-[1.03] hover:border-white hover:bg-white hover:text-black hover:shadow-xl hover:shadow-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:scale-[0.98]"
            >
              {siteContent.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
