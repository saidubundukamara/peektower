import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { contactDetails, socialLinks, type SocialLink } from "@/data/contact";

const contactMethods = [
  {
    label: "Email",
    value: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: contactDetails.whatsappLabel,
    href: contactDetails.whatsappHref,
    icon: MessageCircle,
  },
] as const;

const rowShell =
  "grid min-h-28 grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-black/10 px-5 py-5 last:border-b-0 sm:px-7";

// Only social accounts that actually exist get rendered. Dead placeholder chips
// were unreachable by keyboard and announced nothing useful.
const liveSocials = socialLinks.filter(
  (social): social is SocialLink & { href: string } => social.href !== null,
);

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -right-40 -z-10 h-[34rem] w-[34rem] rounded-full border border-brand/20"
      />
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.85fr)] md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-20 lg:px-12 lg:py-40">
        <div>
          <h2
            id="contact-heading"
            className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
          >
            Tell us what you&apos;re building.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            We&apos;ll tell you honestly whether we can help.
          </p>

          <div className="mt-10 flex items-center gap-3 text-base text-foreground">
            <MapPin className="shrink-0 text-brand-text" size={22} aria-hidden="true" />
            <span>{contactDetails.location}</span>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <div className="overflow-hidden rounded-sm border border-black/10 bg-white">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              // No href yet (WhatsApp): render the row as plain text rather than
              // a link to a number that isn't ours.
              if (!method.href) {
                return (
                  <div key={method.label} className={rowShell}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/5 text-muted">
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-heading text-muted">
                        {method.label}
                      </span>
                      <span className="mt-2 block break-words text-sm font-semibold text-muted sm:text-base">
                        {method.value}
                      </span>
                    </span>
                  </div>
                );
              }

              const isExternal = method.href.startsWith("https://");

              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={`group ${rowShell} transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brand-text`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-text group-hover:text-brand">
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-heading text-brand-text group-hover:text-brand">
                      {method.label}
                    </span>
                    <span className="mt-2 block break-words text-sm font-semibold sm:text-base">
                      {method.value}
                    </span>
                  </span>
                  <ArrowUpRight className="text-muted group-hover:text-white" size={20} aria-hidden="true" />
                </a>
              );
            })}
          </div>

          {liveSocials.length > 0 ? (
            <ul className="mt-7 flex flex-wrap items-center gap-3">
              {liveSocials.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-colors duration-200 hover:border-black hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-7 text-sm text-muted">Social accounts are on the way.</p>
          )}
        </div>
      </div>
    </section>
  );
}
