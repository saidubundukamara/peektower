import Image from "next/image";
import { navItems } from "@/data/nav";
import { socialLinks, type SocialLink } from "@/data/contact";
import { siteContent } from "@/data/site";
import { WorldAperture } from "@/components/ui/WorldAperture";

// The three product sections are consecutive on the page but only reachable
// from the nav as one "Products" link. The footer is where the deep links live.
const productLinks = [
  { label: "Marto", href: "#marto" },
  { label: "EzStaw", href: "#ezstaw" },
  { label: "OpenJustice", href: "#openjustice" },
] as const;

const liveSocials = socialLinks.filter(
  (social): social is SocialLink & { href: string } => social.href !== null,
);

const linkClass =
  "rounded-sm text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand";

// Sentence case, no tracking, no accent colour. The tracked uppercase label was
// the site's default section device; here the column simply is a column.
const columnLabel = "text-sm font-semibold text-white";

export function Footer() {
  return (
    <footer data-cam="7" className="relative isolate text-white">
      <div data-ground className="bg-brand-ink" aria-hidden="true" />

      {/*
        The end of the climb. Everything above this is the structure seen from
        the ground or from across the water; this is the view from the top of
        it, and it is the one place the reader gets to look out rather than up.
      */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-14 sm:px-10 lg:px-12">
        <WorldAperture
          frame="summit"
          ratio="21 / 7"
          tone="dark"
          caption="From the top of the mast, looking out over the peninsula."
          meta="Live"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16 lg:px-12">
        <div>
          <a
            href="#main-content"
            aria-label="PeekTower home"
            className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <Image
              src="/logo/peektower-white.png"
              alt="PeekTower"
              width={1343}
              height={378}
              className="h-10 w-auto object-contain object-left"
            />
          </a>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60">{siteContent.tagline}</p>

          {liveSocials.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-4">
              {liveSocials.map((social) => (
                <li key={social.label}>
                  <a
                    className={linkClass}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-14">
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={columnLabel}>
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className={linkClass} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-products">
            <h2 id="footer-products" className={columnLabel}>
              Products
            </h2>
            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <a className={linkClass} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/*
          No year. Under `output: "export"` a build-time getFullYear() freezes at
          whenever the site was last deployed, which is worse than omitting it.
        */}
        <p className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-white/50 sm:px-10 lg:px-12">
          &copy; PeekTower Company Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
