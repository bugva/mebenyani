"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import { VenueStrip } from "@/components/VenueStrip";
import { useParallax } from "@/lib/use-parallax";
import { motion } from "framer-motion";
import { useRef } from "react";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbY = useParallax(sectionRef, 30);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-surface/30 px-6 py-24 md:py-32"
    >
      <motion.div
        className="pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
        style={{ y: orbY }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="08 — Referanslar"
            title="Ne dediler?"
            subtitle="İş birliği yaptığım kişilerden kısa notlar — isimler örnek/portföy amaçlı."
          />
        </Reveal>
        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          {site.testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <SpotlightCard tilt className="card-shine relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/35 hover:shadow-[0_24px_50px_-24px_rgba(125,164,255,0.3)]">
                <span
                  className="pointer-events-none absolute -top-4 right-4 select-none font-display text-[110px] leading-none text-accent/10"
                  aria-hidden
                >
                  &rdquo;
                </span>
                <p className="relative flex-1 text-sm leading-relaxed text-muted md:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-8 flex items-center gap-3.5 border-t border-border pt-6">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-display text-base text-accent"
                    aria-hidden
                  >
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span>
                    <span className="block font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-xs uppercase tracking-wider text-accent">
                      {item.role}
                    </span>
                  </span>
                </footer>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <VenueStrip />
      </div>
    </section>
  );
}
