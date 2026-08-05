"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrambleText } from "@/components/ScrambleText";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const rows = [
  { key: "konum", value: "Ankara, TR", live: false },
  { key: "odak", value: "konser arşivi + portföy altyapısı", live: false },
  { key: "okuyor", value: "“Görmenin Psikolojisi” — Arnheim", live: false },
  { key: "dinliyor", value: "şu an: moderat — seamless mix", live: false },
  { key: "üretim", value: "bu sitenin v2'si", live: false },
  { key: "durum", value: "yeni işlere açık", live: true },
];

function NowRow({
  row,
  index,
}: {
  row: (typeof rows)[number];
  index: number;
}) {
  const reduced = useReducedMotion();
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!row.live) return;
    const format = () =>
      new Intl.DateTimeFormat("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Istanbul",
      }).format(new Date());
    const start = requestAnimationFrame(() => setTime(format()));
    const id = setInterval(() => setTime(format()), 1000);
    return () => {
      cancelAnimationFrame(start);
      clearInterval(id);
    };
  }, [row.live]);

  return (
    <motion.div
      className="group flex items-baseline justify-between gap-4 border-b border-border/60 py-4 last:border-b-0"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="flex items-baseline gap-3">
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent/60 transition-transform duration-300 group-hover:scale-150"
          aria-hidden
        />
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {row.key}
        </span>
      </span>
      <span className="text-right text-sm text-foreground md:text-base">
        {row.live ? (
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {row.value}
            <span className="font-mono text-xs text-muted">{time}</span>
          </span>
        ) : reduced ? (
          row.value
        ) : (
          <ScrambleText text={row.value} />
        )}
      </span>
    </motion.div>
  );
}

export function Now() {
  return (
    <section id="simdi" className="relative overflow-hidden border-y border-border bg-surface/20 px-6 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(125,164,255,0.03),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading
            index="09 — Şu an"
            title="Ne yapıyorum şu an"
            subtitle="Canlı olmasa da dürüst bir anlık görüntü — haftada bir güncellerim."
          />
        </Reveal>
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
              status://live
            </span>
            <span className="font-mono text-[10px] tracking-wider text-muted">
              last.sync ≈ şimdi
            </span>
          </div>
          <div className="mt-2">
            {rows.map((row, i) => (
              <NowRow key={row.key} row={row} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
