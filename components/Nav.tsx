"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const hasLightSurface = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        hasLightSurface
          ? "border-black/10 bg-white/95 text-foreground shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent text-white"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-12"
      >
        <a
          href="#main-content"
          aria-label="PeekTower home"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src={hasLightSurface ? "/logo/peektower-black.png" : "/logo/peektower-white.png"}
            alt="PeekTower"
            width={1920}
            height={1080}
            priority
            className="h-12 w-auto object-contain object-left sm:h-14"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-sm text-xs font-bold uppercase tracking-heading transition-colors hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`overflow-hidden border-t border-black/10 bg-white transition-[max-height,opacity] duration-300 md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-sm border-b border-black/10 py-4 text-sm font-bold uppercase tracking-heading text-foreground transition-colors last:border-0 hover:text-brand-text focus-visible:outline-2 focus-visible:outline-brand-text"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
