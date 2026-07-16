import Image from "next/image";
import { ArrowRight, Blocks, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <Image
            src="/logo/peektower-black.png"
            alt="PeekTower"
            width={1920}
            height={1080}
            priority
            className="h-14 w-auto object-contain object-left sm:h-16"
          />
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-heading text-muted">
            <Blocks aria-hidden="true" className="h-4 w-4 text-brand" />
            Static export ready
          </div>
        </header>

        <div className="grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-heading text-brand">
              Phase 1 scaffold
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] text-foreground sm:text-7xl">
              PeekTower brand system is wired into Next.js.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Static export, Tailwind tokens, self-hosted font loading, favicon
              assets, logo files, and lucide icons are ready for the content
              phases.
            </p>
          </div>

          <div className="border-l-2 border-brand pl-6">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-brand text-brand-ink">
              <Smartphone aria-hidden="true" className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Next step: layout shell
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              Phase 2 can now add the sticky navigation, footer, and anchor
              placeholders for the one-page company site.
            </p>
            <a
              href="https://getmarto.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-heading text-foreground hover:text-brand"
            >
              Marto
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
