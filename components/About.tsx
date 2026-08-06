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
        <SectionHeading index="01" title="Hakkımda" />
        <Reveal delay={0.05}>
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="max-w-2xl text-xl leading-[1.6] text-foreground md:text-2xl md:leading-[1.45]">
                {site.about}
              </p>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {site.interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <aside>
              <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                Az söz.
                <br />
                Net yapı.
              </p>
              <ol className="mt-12 space-y-8 border-t border-border pt-8">
                {site.timeline.map((entry, i) => (
                  <motion.li
                    key={entry.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  >
                    <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                      {entry.year}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-foreground">
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
