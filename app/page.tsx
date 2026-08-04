import { About } from "@/components/About";
import { BigMarquee } from "@/components/BigMarquee";
import { Contact } from "@/components/Contact";
import { CursorGlow } from "@/components/CursorGlow";
import { CustomCursor } from "@/components/CustomCursor";
import { Faq } from "@/components/Faq";
import { Focus } from "@/components/Focus";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { PhotoPlayground } from "@/components/PhotoPlayground";
import { Process } from "@/components/Process";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Intro />
      <CustomCursor />
      <CursorGlow />
      <ScrollProgress />
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
        <Testimonials />
        <BigMarquee />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
