import { ArrowDownRight } from "lucide-react";
import { siteContent } from "@/data/site";
import { PlasmaBackground } from "@/components/PlasmaBackground";
import { TowerMark } from "@/components/TowerMark";
import { RevealWords } from "@/components/ui/motion";

export function Hero() {
  return (
    <section
      data-cam="0"
      className="hero-shell relative isolate flex min-h-svh items-end overflow-hidden bg-brand-ink text-white"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-20 opacity-20" />

      {/*
        Three layers, in back-to-front order:
        - PlasmaBackground — the shader. Sets data-gl once a context succeeds,
          which is what hides the fallback below it. First in DOM order so a
          plain sibling combinator can do that without :has().
        - .signal-field — pure CSS rings. Paints on first frame with no JS, and
          is the permanent state on devices without WebGL.
        - TowerMark — what the signal radiates from, sitting in the empty band
          under the nav. The shader measures this element to place its origin.
      */}
      <PlasmaBackground />

      <div aria-hidden="true" className="signal-field">
        <span className="signal-ring" />
        <span className="signal-ring" />
        <span className="signal-ring" />
      </div>

      <TowerMark className="signal-tower pointer-events-none absolute -z-[21] text-brand/30" />

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-24 lg:px-12 lg:pb-20">
        <div className="hero-reveal hero-reveal-1 flex items-center gap-4">
          <span className="h-px w-10 bg-brand" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-heading text-brand">
            {siteContent.location}
          </p>
        </div>

        {/*
          The headline arrives a word at a time rather than as one block. It is
          the only display heading in the first viewport, so it can carry the
          slower entrance without competing with anything.
        */}
        <RevealWords
          as="h1"
          className="mt-7 max-w-5xl text-balance text-[clamp(2.75rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]"
          segments={[
            { text: "Building practical digital products" },
            { text: "from Sierra Leone.", className: "text-white/55" },
          ]}
        />

        <div className="hero-reveal hero-reveal-3 mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            {siteContent.positioning}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={siteContent.primaryCta.href}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition-[background-color,transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:shadow-2xl hover:shadow-brand/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:scale-[0.98]"
            >
              {siteContent.primaryCta.label}
              <ArrowDownRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={siteContent.secondaryCta.href}
              className="group inline-flex min-h-12 items-center justify-center rounded-sm border border-white/35 px-6 py-3 text-sm font-bold text-white transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out-expo hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black hover:shadow-xl hover:shadow-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:scale-[0.98]"
            >
              {siteContent.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
