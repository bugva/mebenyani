"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrambleText } from "@/components/ScrambleText";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { useState } from "react";

const principles = [
  {
    no: "01",
    line: "Az söz, net yapı.",
    detail: "Her şeyi anlatmaya çalışan hiçbir şey anlatamaz.",
  },
  {
    no: "02",
    line: "Işık önce, kural sonra.",
    detail: "Teknik doğruyu ezberlemek yerine görmeyi öğren.",
  },
  {
    no: "03",
    line: "Mobilde bozuluyorsa bitmemiştir.",
    detail: "Masaüstü vitrin değil; kullanılan şey telefon.",
  },
  {
    no: "04",
    line: "Bitir, sonra güzelleştir.",
    detail: "Yarım kalmış mükemmel, bitmiş sıradanlığa yenilir.",
  },
  {
    no: "05",
    line: "Sahip olmadığın efekti kullanma.",
    detail: "Trend değil, işlev; hareket bir cevap olmalı.",
  },
];

function PrincipleLine({
  item,
  index,
}: {
  item: (typeof principles)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-default border-b border-border/70 py-6 transition-colors duration-300 last:border-b-0 hover:border-accent/25 md:py-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-baseline gap-5 md:gap-8">
        <span className="shrink-0 font-mono text-xs tracking-widest text-accent/70 md:text-sm">
          {item.no}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "font-display text-2xl leading-tight tracking-tight transition-colors duration-300 md:text-4xl",
              hovered ? "text-foreground" : "text-foreground/85",
            )}
          >
            <ScrambleText text={item.line} />
          </h3>
          <motion.p
            className="mt-2 max-w-xl text-sm text-muted md:text-base"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.55 }}
            transition={{ duration: 0.3 }}
          >
            {item.detail}
          </motion.p>
        </div>
        <motion.span
          className="shrink-0 self-center text-accent"
          initial={false}
          animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          →
        </motion.span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-accent/60 via-[rgba(167,139,250,0.4)] to-transparent"
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </motion.div>
  );
}

export function Manifesto() {
  return (
    <section id="prensipler" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            index="10 — Prensipler"
            title="Nasıl çalışırım"
            subtitle="Kurallar değil — tekrar tekrar işe yarayan şeyler."
          />
        </Reveal>
        <div>
          {principles.map((item, i) => (
            <PrincipleLine key={item.no} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
