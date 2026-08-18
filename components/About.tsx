import Image from "next/image";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12 lg:py-40">
        <h2
          id="about-heading"
          className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
        >
          Technology built here, for the problems we actually have.
        </h2>

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
          </div>

          {/*
            The right column used to be empty on desktop. A photograph of the city
            the company is arguing for does more here than a pull-quote would, and
            the comms tower in the middle of the frame is the same shape as the mark.
          */}
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
