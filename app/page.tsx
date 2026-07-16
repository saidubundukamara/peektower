import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { MartoShowcase } from "@/components/MartoShowcase";
import { Services } from "@/components/Services";

const remainingSections = [
  { id: "team", label: "Team", description: "The people building PeekTower." },
  { id: "contact", label: "Contact", description: "Start a conversation with us." },
] as const;

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Services />
      <MartoShowcase />

      {remainingSections.map((section, index) => (
        <section
          id={section.id}
          key={section.id}
          className={index % 2 === 0 ? "bg-white" : "bg-surface"}
        >
          <div className="mx-auto flex min-h-[65vh] w-full max-w-6xl items-center px-6 py-24 sm:px-10 lg:px-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-heading text-brand-text">
                Coming next · {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-6xl">{section.label}</h2>
              <p className="mt-4 text-lg text-muted">{section.description}</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
