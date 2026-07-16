import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { teamMembers } from "@/data/team";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Team() {
  return (
    <section id="team" className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32 lg:px-12 lg:py-40">
        <ScrollReveal className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <p className="text-xs font-bold uppercase tracking-heading text-brand-text">Our team</p>
          <div>
            <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              The team building PeekTower.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Four founders building technology out of Freetown, for Sierra Leone first.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 70} className="h-full">
              <article className="flex h-full min-h-72 flex-col bg-surface p-7 sm:p-8">
                <div
                  aria-hidden="true"
                  className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br p-[2px] ${
                    index % 2 === 0 ? "from-brand to-brand-text" : "from-brand-text to-brand"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-surface text-xl font-semibold tracking-[0.08em] text-brand-text">
                    {getInitials(member.name)}
                  </div>
                </div>
                <div className="mt-auto pt-14">
                  <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em]">
                    {member.name}
                  </h3>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-text">
                    {member.title}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
