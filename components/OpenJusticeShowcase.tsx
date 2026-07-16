import { ArrowUpRight, CloudOff, Code2, Landmark, RadioTower } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

export function OpenJusticeShowcase() {
  return (
    <section id="openjustice" className="relative overflow-hidden bg-[#f2f7f5] text-[#10251f]">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border border-[#16a36a]/20"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#16a36a]/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[minmax(19rem,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20 lg:px-12 lg:py-40">
        <ScrollReveal className="order-2 lg:order-1">
          <div className="relative rounded-2xl bg-[#10251f] p-2 shadow-[0_2rem_5rem_rgb(16_37_31_/_0.2)] sm:p-3">
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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16a36a] opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a36a]" />
              </span>
              Works offline
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="order-1 lg:order-2" delay={120}>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#16a36a]" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-heading text-[#08794b]">
              Digital Public Good
            </p>
          </div>

          <h2 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">
            OpenJustice. <span className="text-[#10251f]/45">Justice infrastructure that travels.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#10251f]/65 sm:text-lg sm:leading-8">
            An open-source criminal records platform designed for law enforcement agencies across
            Africa. It works through weak connections, continues offline, and keeps each country in
            control of its own deployment and data.
          </p>

          <ul className="mt-10 divide-y divide-[#10251f]/12 border-y border-[#10251f]/12">
            {openJusticeFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <li key={feature.title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                  <Icon className="mt-0.5 text-[#08794b]" size={23} strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#10251f]/60">{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://crms-inky.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#10251f] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#08794b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08794b]"
            >
              Explore OpenJustice
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/PeekTower-HQ/crms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-[#10251f]/25 px-6 py-3 text-sm font-bold transition-colors hover:border-[#10251f] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08794b]"
            >
              <Code2 size={18} aria-hidden="true" />
              View source
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
