import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12 lg:py-40">
        <ScrollReveal className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <p className="text-xs font-bold uppercase tracking-heading text-brand-text">What we do</p>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
            Software, from first sketch to shipped product.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-black/10 bg-black/10 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <ScrollReveal key={service.title} delay={index * 80} className="h-full">
                <article className="group flex h-full min-h-80 flex-col bg-white p-7 transition-colors duration-300 hover:bg-black hover:text-white sm:p-9">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold tracking-heading text-brand-text group-hover:text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      size={30}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-brand-text transition-colors group-hover:text-brand"
                    />
                  </div>
                  <div className="mt-auto pt-16">
                    <h3 className="text-2xl font-semibold tracking-[-0.025em]">{service.title}</h3>
                    <p className="mt-4 max-w-sm text-base leading-7 text-muted transition-colors group-hover:text-white/65">
                      {service.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
