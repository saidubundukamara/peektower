import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-20 lg:px-12 lg:py-40">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-heading text-brand-text">About PeekTower</p>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Technology shaped here, built to move people forward.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="flex flex-col justify-end" delay={100}>
          <div className="border-l-2 border-brand pl-6">
            <p className="text-xs font-bold uppercase tracking-heading text-brand-text">Built in Freetown</p>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              PeekTower Company Limited is a technology company based in Freetown, Sierra Leone.
              We turn useful ideas into clear, dependable digital products.
            </p>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Our work spans web development, mobile applications, and product design. Marto—our
              ride-hailing and car-rental platform—is the first product in that journey.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
