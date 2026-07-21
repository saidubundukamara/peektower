import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { EzStawShowcase } from "@/components/EzStawShowcase";
import { Hero } from "@/components/Hero";
import { MartoShowcase } from "@/components/MartoShowcase";
import { OpenJusticeShowcase } from "@/components/OpenJusticeShowcase";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <About />
      <Services />
      <MartoShowcase />
      <EzStawShowcase />
      <OpenJusticeShowcase />
      <Contact />
    </main>
  );
}
