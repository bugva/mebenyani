"use client";

import { site } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import { useParallax } from "@/lib/use-parallax";
import { motion } from "framer-motion";
import { useRef } from "react";

export function Focus() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbY = useParallax(sectionRef, 30);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24 md:py-32">
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/10 blur-[90px]"
        style={{ y: orbY }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="02 — Şu an"
          title="Odaklandığım şeyler"
          subtitle="Fotoğraf, video ve web — paralel ama birbirini besleyen alanlar."
        />
        <StaggerGroup className="grid gap-4 md:grid-cols-3">
          {site.focus.map((item, i) => (
            <StaggerItem key={item.title}>
              <SpotlightCard tilt className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_40px_-20px_rgba(125,164,255,0.25)]">
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="ghost-num text-6xl" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
