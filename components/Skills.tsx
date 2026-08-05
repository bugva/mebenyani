"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import { useParallax } from "@/lib/use-parallax";
import { motion } from "framer-motion";
import { useRef } from "react";

const icons = {
  fotograf: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="14" r="3.5" />
    </svg>
  ),
  video: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="5" width="13" height="14" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </svg>
  ),
  web: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />
    </svg>
  ),
};

const groups = [
  { key: "fotograf" as const, label: "Fotoğraf" },
  { key: "video" as const, label: "Video" },
  { key: "web" as const, label: "Web" },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbY = useParallax(sectionRef, 30);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-surface/30 px-6 py-24 md:py-32"
    >
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[rgba(100,140,200,0.08)] blur-[100px]"
        style={{ y: orbY }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="04 — Beceriler"
            title="Araçlar ve alanlar"
            subtitle="Lenslerden kurguda, editörden deploy’a — kullandığım şeyler."
          />
        </Reveal>
        <StaggerGroup className="grid gap-10 md:grid-cols-3">
          {groups.map((group) => (
            <StaggerItem key={group.key}>
              <div>
                <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-accent/25 bg-background text-accent">
                    {icons[group.key]}
                  </span>
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {site.skills[group.key].map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
