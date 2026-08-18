"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/data/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Watch every section an item can match, not just its own href, so "Products"
  // stays lit across all three consecutive product sections.
  const sectionIds = useMemo(
    () => navItems.flatMap((item) => item.matches ?? [item.href.slice(1)]),
    [],
  );
  const activeId = useScrollSpy(sectionIds);

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

  // #00bfff on the ink hero is 8.93:1; #00718f on it is only 4.15:1. Flip the
  // hover colour with the surface rather than using one that fails on dark.
  const linkHover = hasLightSurface ? "hover:text-brand-text" : "hover:text-brand";
  const linkActive = hasLightSurface ? "text-brand-text" : "text-brand";

  const isItemActive = (item: (typeof navItems)[number]) =>
    activeId !== null && (item.matches ?? [item.href.slice(1)]).includes(activeId);

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
        className="mx-auto flex h-[var(--nav-h)] w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-12"
      >
        <a
          href="#main-content"
          aria-label="PeekTower home"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text"
          onClick={() => setIsMenuOpen(false)}
        >
          {/*
            Both marks are stacked and cross-faded on the same 300ms curve as the
            header background. Swapping `src` instead left the white mark on the
            already-white bar for the length of the transition.
          */}
          <span className="relative block h-9 w-[calc(1343/378*2.25rem)] sm:h-10 sm:w-[calc(1343/378*2.5rem)]">
            <Image
              src="/logo/peektower-white.png"
              alt="PeekTower"
              fill
              sizes="140px"
              priority
              className={`object-contain object-left transition-opacity duration-300 ${
                hasLightSurface ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/logo/peektower-black.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="140px"
              priority
              className={`object-contain object-left transition-opacity duration-300 ${
                hasLightSurface ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = isItemActive(item);

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-sm text-xs font-bold uppercase tracking-heading transition-colors ${linkHover} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text ${
                    isActive ? linkActive : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors ${linkHover} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text md:hidden`}
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
          isMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-10 lg:px-12">
          {navItems.map((item) => {
            const isActive = isItemActive(item);

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-sm border-b border-black/10 py-4 text-sm font-bold uppercase tracking-heading transition-colors last:border-0 hover:text-brand-text focus-visible:outline-2 focus-visible:outline-brand-text ${
                    isActive ? "text-brand-text" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
