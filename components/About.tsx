"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  return (
    <section id="hakkimda" className="scroll-mt-28 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01 — Hakkımda"
          title="Kadraj, kurgu ve kod"
          subtitle="Fotoğraftan videoya, videodan web’e — hepsinde aynı merak: düzenli, sade, anlamlı."
        />
        <Reveal delay={0.1}>
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div>
              <p className="text-lg leading-[1.8] text-muted md:text-xl md:leading-[1.75] whitespace-pre-line">
                {site.about}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {site.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted transition-all duration-300 hover:border-accent/50 hover:text-foreground hover:shadow-[0_0_18px_-4px_rgba(125,164,255,0.4)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <aside className="space-y-0">
              <blockquote className="gradient-border relative mb-10 rounded-2xl p-6 font-display text-xl leading-snug text-foreground">
                <span
                  className="pointer-events-none absolute -top-3 left-5 font-display text-5xl text-accent/70"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <span className="relative pl-4">Az söz, net yapı.</span>
              </blockquote>
              <ol className="relative border-l border-transparent pl-7">
                <div
                  className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-accent/60 via-[rgba(167,139,250,0.35)] to-transparent"
                  aria-hidden
                />
                {site.timeline.map((entry, i) => (
                  <motion.li
                    key={entry.title}
                    className={i < site.timeline.length - 1 ? "pb-8" : ""}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  >
                    <span className="absolute -left-[30px] mt-1.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
                    </span>
                    <p className="font-mono text-[10px] tracking-widest text-accent uppercase">
                      {entry.year}
                    </p>
                    <h3 className="mt-1 font-display text-base text-foreground">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{entry.description}</p>
                  </motion.li>
                ))}
              </ol>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
