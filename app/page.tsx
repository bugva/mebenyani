import { About } from "@/components/About";
import { BigMarquee } from "@/components/BigMarquee";
import { Contact } from "@/components/Contact";
import { CustomCursor } from "@/components/CustomCursor";
import { Focus } from "@/components/Focus";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { GlitchEasterEgg } from "@/components/GlitchEasterEgg";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Manifesto } from "@/components/Manifesto";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Intro />
      <CustomCursor />
      <ScrollProgress />
      <GlitchEasterEgg />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Focus />
        <Gallery />
        <Process />
        <Services />
        <BigMarquee />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
