import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MartoShowcase } from "@/components/MartoShowcase";
import { OpenJusticeShowcase } from "@/components/OpenJusticeShowcase";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <About />
      <Services />
      <MartoShowcase />
      <OpenJusticeShowcase />
      <Team />
      <Contact />
    </main>
  );
}
