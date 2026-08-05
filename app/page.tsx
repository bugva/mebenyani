import { About } from "@/components/About";
import { BigMarquee } from "@/components/BigMarquee";
import { Contact } from "@/components/Contact";
import { CursorGlow } from "@/components/CursorGlow";
import { CustomCursor } from "@/components/CustomCursor";
import { Experiments } from "@/components/Experiments";
import { Focus } from "@/components/Focus";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { GlitchEasterEgg } from "@/components/GlitchEasterEgg";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { LiveLab } from "@/components/LiveLab";
import { Manifesto } from "@/components/Manifesto";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Now } from "@/components/Now";
import { PhotoPlayground } from "@/components/PhotoPlayground";
import { Process } from "@/components/Process";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Intro />
      <CustomCursor />
      <CursorGlow />
      <ScrollProgress />
      <GlitchEasterEgg />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Focus />
        <Gallery />
        <Process />
        <Skills />
        <PhotoPlayground />
        <Services />
        <Experiments />
        <LiveLab />
        <Now />
        <BigMarquee />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
