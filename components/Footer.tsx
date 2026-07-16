import Image from "next/image";
import { navItems } from "@/data/nav";

const socialLinks = ["LinkedIn", "Instagram", "Facebook"] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1fr_auto] md:items-start lg:px-12">
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
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
            Building practical digital products from Freetown, Sierra Leone.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-heading text-brand">Explore</p>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    className="rounded-sm text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-heading text-brand">Social</p>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((label) => (
                <li key={label}>
                  <span
                    className="inline-flex items-center rounded-full border border-dashed border-white/20 px-3 py-1 text-xs text-white/50"
                    title="Link coming soon"
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-white/50 sm:px-10 lg:px-12">
          &copy; {currentYear} PeekTower Company Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
