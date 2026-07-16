import {
  ArrowUpRight,
  BadgeCheck,
  CarFront,
  MapPinned,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const martoFeatures = [
  {
    title: "Know the fare upfront",
    description: "See what your trip costs before you confirm.",
    icon: WalletCards,
  },
  {
    title: "Ride with confidence",
    description: "Connect with verified drivers for everyday journeys.",
    icon: BadgeCheck,
  },
  {
    title: "Follow every trip",
    description: "Live tracking keeps the route clear from pickup to arrival.",
    icon: MapPinned,
  },
  {
    title: "Ride or rent",
    description: "Book a ride now or find a car for longer plans.",
    icon: CarFront,
  },
] as const;

export function MartoShowcase() {
  return (
    <section id="marto" className="relative isolate overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-20 w-2/3 bg-[radial-gradient(circle_at_center,rgb(0_191_255_/_0.2),transparent_62%)]"
      />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-30 opacity-20" />

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-center lg:gap-20 lg:px-12 lg:py-40">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-brand" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-brand">
              Flagship product
            </p>
          </div>

          <h2 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">
            Your Ride. <span className="text-white/45">Your Way.</span> Marto.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            One mobility app for getting around Freetown—whether you need a driver today or a car
            for longer. Marto makes each step simple, clear, and easy to follow.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-white/15 bg-white/15 sm:grid-cols-2">
            {martoFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <li key={feature.title} className="bg-black/80 p-5 sm:p-6">
                  <Icon className="text-brand" size={24} strokeWidth={1.6} aria-hidden="true" />
                  <p className="mt-5 font-semibold">{feature.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/55">{feature.description}</p>
                </li>
              );
            })}
          </ul>

          <a
            href="https://getmarto.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-bold text-brand-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Explore Marto
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </ScrollReveal>

        <ScrollReveal className="mx-auto w-full max-w-md lg:max-w-none" delay={120}>
          <div className="relative mx-auto w-full max-w-[28rem]">
            <div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-[2%] h-[82%] rounded-full bg-brand/20 blur-3xl"
            />
            <Image
              src="/screen-rider-home.png"
              alt="Marto rider app home screen showing ride and car-rental options in Freetown"
              width={1294}
              height={2657}
              sizes="(max-width: 1023px) 90vw, 448px"
              className="relative h-auto w-full drop-shadow-[0_2.5rem_4rem_rgb(0_0_0_/_0.55)]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
