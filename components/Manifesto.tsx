"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";

const principles = [
  { no: "01", line: "Az söz, net yapı." },
  { no: "02", line: "Işık önce." },
  { no: "03", line: "Mobilde bozuluyorsa bitmemiştir." },
  { no: "04", line: "Bitir, sonra güzelleştir." },
  { no: "05", line: "Sahip olmadığın efekti kullanma." },
];

export function Manifesto() {
  return (
    <section id="prensipler" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading index="06" title="Prensipler" />
        </Reveal>
        <div className="border-t border-border">
          {principles.map((item, i) => (
            <motion.div
              key={item.no}
              className="flex items-baseline gap-6 border-b border-border py-7 md:gap-10 md:py-9"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="shrink-0 font-mono text-xs tracking-[0.22em] text-muted">
                {item.no}
              </span>
              <h3 className="font-display text-2xl tracking-tight text-foreground md:text-4xl">
                {item.line}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
