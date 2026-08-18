import { services } from "@/data/services";

/**
 * A typographic index, not a card grid.
 *
 * This was three equal boxes of icon + heading + text with 01/02/03 markers.
 * Web, mobile and design are parallel capabilities rather than a sequence, so
 * the numbers encoded nothing, and the icons were generic. Hierarchy now comes
 * from the size step between the service name and its description, and each
 * row names something we actually shipped doing it.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12 lg:py-40">
        <h2
          id="services-heading"
          className="max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
        >
          What we build.
        </h2>

        <ul className="mt-16 border-t border-black/12">
          {services.map((service) => (
            <li
              key={service.title}
              className="grid gap-x-10 gap-y-3 border-b border-black/12 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:py-10"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                {service.title}
              </h3>
              <div>
                <p className="max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {service.description}
                </p>
                <p className="mt-3 text-sm text-brand-text">{service.builtIt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
