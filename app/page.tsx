import { About } from "@/components/About";
import { AmbientOrbits } from "@/components/AmbientOrbits";
import { BigMarquee } from "@/components/BigMarquee";
import { Contact } from "@/components/Contact";
import { CursorGlow } from "@/components/CursorGlow";
import { CursorTrail } from "@/components/CursorTrail";
import { CustomCursor } from "@/components/CustomCursor";
import { Focus } from "@/components/Focus";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { GlitchEasterEgg } from "@/components/GlitchEasterEgg";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Manifesto } from "@/components/Manifesto";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { PhotoPlayground } from "@/components/PhotoPlayground";
import { Process } from "@/components/Process";
import { SectionRail } from "@/components/SectionRail";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Intro />
      <AmbientOrbits />
      <CustomCursor />
      <CursorTrail />
      <CursorGlow />
      <ScrollProgress />
      <SectionRail />
      <GlitchEasterEgg />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Focus />
        <Gallery />
        <Process />
        <Skills />
        <PhotoPlayground />
        <Services />
        <BigMarquee />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
