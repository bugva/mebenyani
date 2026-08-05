"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const experiments = [
  {
    tag: "WEBGL",
    title: "Scanline portre motoru",
    status: "deney",
    note: "Kamera karesini gerçek zamanlı scanline/RGB split ile bozan shader çalışması.",
  },
  {
    tag: "AI",
    title: "Prompt → sahne ışığı reçetesi",
    status: "v0.2",
    note: "Konser fotoğraflarımdan öğrenip ışık kurulumu öneren küçük model denemesi.",
  },
  {
    tag: "TYPE",
    title: "Kinetik tipografi jeneratörü",
    status: "arşiv",
    note: "Scramble + spring physics ile kendi kendine yazılan başlık sistemi — bu sitede canlı.",
  },
];

function ExperimentCard({
  item,
  index,
}: {
  item: (typeof experiments)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(sy, [0, 1], reduced ? [0, 0] : [6, -6]);
  const rotateY = useTransform(sx, [0, 1], reduced ? [0, 0] : [-6, 6]);
  const glowX = useTransform(sx, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(sy, [0, 1], ["20%", "80%"]);

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-colors duration-300",
        hovered && "border-accent/45",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(125,164,255,0.12), transparent 55%)`,
        }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-md border border-accent/25 bg-background px-2 py-1 font-mono text-[10px] tracking-widest text-accent">
          {item.tag}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {item.status}
        </span>
      </div>
      <h3 className="relative mt-5 font-display text-lg text-foreground md:text-xl">
        {item.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {item.note}
      </p>
      <div className="relative mt-6 h-px w-full bg-gradient-to-r from-accent/35 via-transparent to-transparent" aria-hidden />
    </motion.div>
  );
}

export function Experiments() {
  return (
    <section id="deneyler" className="relative overflow-hidden px-6 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(167,139,250,0.06),transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="07 — Laboratuvar"
            title="Deney tezgahı"
            subtitle="Bitmiş işler değil — üzerinde oynadığım şeyler. Kırılabilir, değişebilir, yayınlanabilir."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {experiments.map((item, i) => (
            <ExperimentCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
