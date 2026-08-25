import Image from "next/image";
import { RevealWords } from "@/components/ui/motion";
import { WorldAperture } from "@/components/ui/WorldAperture";

export function About() {
  return (
    <section
      id="about"
      data-cam="1"
      aria-labelledby="about-heading"
      className="relative isolate"
    >
      {/*
        The ground moves off the section and onto its own layer so the aperture
        below can be cut out of it. Without this the white would paint straight
        over the canvas and there would be nothing to look through.
      */}
      <div data-ground className="bg-white" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12 lg:py-40">
        <RevealWords
          as="h2"
          id="about-heading"
          className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
          text="Technology built here, for the problems we actually have."
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="max-w-xl">
            <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
              PeekTower Company Limited is a technology company based in Freetown, Sierra
              Leone. We build digital products that are simple to use and easy to trust.
            </p>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              We work across web, mobile, and product design. Three of those products are
              already live: Marto gets people around Freetown, EzStaw helps merchants sell
              online, and OpenJustice keeps justice systems working when the internet
              doesn&apos;t.
            </p>

            {/*
              The photograph beside this was chosen because the comms tower in the
              middle of the frame is the same shape as our mark. This is that
              shape, drawn from the mark's own geometry and standing in the same
              haze — the photograph and the drawing, side by side.
            */}
            <WorldAperture
              className="mt-10"
              frame="harbour"
              ratio="16 / 10"
              caption="The mark, standing over the same harbour."
              meta="Live"
            />
          </div>

          <figure className="lg:-mt-2">
            <Image
              src="/photos/freetown-harbour.webp"
              alt="Central Freetown at dusk, looking out over the Atlantic, with a communications tower rising between the office blocks"
              width={1400}
              height={933}
              sizes="(max-width: 1023px) 100vw, 620px"
              className="h-auto w-full rounded-sm object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">
              Central Freetown, looking out over the Atlantic.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
