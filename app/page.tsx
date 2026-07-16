const sections = [
  { id: "about", label: "About", description: "Who we are and why we build." },
  { id: "services", label: "Services", description: "Practical software services for ambitious ideas." },
  { id: "marto", label: "Marto", description: "Our flagship mobility product for Freetown." },
  { id: "team", label: "Team", description: "The people building PeekTower." },
  { id: "contact", label: "Contact", description: "Start a conversation with us." },
] as const;

export default function Home() {
  return (
    <main id="top">
      <section className="flex min-h-screen items-end bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:px-10 sm:pb-24 lg:px-12">
          <p className="text-sm font-bold uppercase tracking-heading text-brand">PeekTower</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-7xl">
            Building practical digital products from Sierra Leone.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            The layout shell is ready. Content sections arrive in the next phases.
          </p>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          id={section.id}
          key={section.id}
          className={index % 2 === 0 ? "bg-white" : "bg-surface"}
        >
          <div className="mx-auto flex min-h-[65vh] w-full max-w-6xl items-center px-6 py-24 sm:px-10 lg:px-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-heading text-brand">
                Section {String(index + 1).padStart(2, "0")}
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
