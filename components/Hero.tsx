"use client";

import { site } from "@/content/site";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { RGBSplitImage } from "@/components/RGBSplitImage";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;
const roles = ["Fotoğrafçı", "Video yapımcısı", "Web geliştirici"];

function StatValue({ value, delay }: { value: string; delay: number }) {
  const reduced = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = Number(match?.[1] ?? 0);
  const suffix = match?.[2] ?? "";
  const count = useMotionValue(0);
  const rendered = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (reduced) {
      count.set(target);
      return;
    }
    const controls = animate(count, target, {
      duration: 1.3,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [count, target, delay, reduced]);

  return <motion.span>{rendered}</motion.span>;
}

function NameLine({
  text,
  letterClassName,
  baseDelay,
}: {
  text: string;
  letterClassName?: string;
  baseDelay: number;
}) {
  let letterIndex = 0;
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <span className="flex flex-wrap gap-x-[0.22em]">
        {text.split(" ").map((word, wi) => (
          <span key={wi} className="flex whitespace-nowrap">
            {word.split("").map((ch, i) => {
              const delay = baseDelay + letterIndex * 0.032;
              letterIndex += 1;
              return (
                <motion.span
                  key={i}
                  className={cn("inline-block cursor-default", letterClassName)}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  whileHover={{ y: -12, transition: { type: "spring", stiffness: 500, damping: 14 } }}
                  transition={{ duration: 0.7, delay, ease }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  const featured = site.gallery[0];
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-20 md:pt-32"
    >
      {/* Atmosfer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="aurora absolute -top-24 left-[8%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(125,164,255,0.16),transparent_65%)]" />
        <div
          className="aurora absolute top-1/3 right-[4%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_65%)]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="aurora absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(125,164,255,0.1),transparent_60%)]"
          style={{ animationDelay: "-12s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,transparent,var(--background))]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.div
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-4 py-1.5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              Yeni işlere açık · Ankara
            </span>
          </motion.div>

          <motion.h1
            className="mt-7 font-display text-[clamp(3rem,9vw,6.25rem)] font-bold leading-[0.92] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <NameLine
              text={site.name.split(" ")[0]}
              letterClassName="text-foreground"
              baseDelay={0.12}
            />
            <NameLine
              text={site.name.split(" ").slice(1).join(" ")}
              letterClassName="text-shimmer"
              baseDelay={0.3}
            />
          </motion.h1>

          <motion.p
            className="mt-6 flex items-baseline gap-3 font-mono text-sm tracking-wider text-muted md:text-base"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease }}
          >
            <span className="text-accent">→</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
                className="inline-block text-foreground"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span>— Ankara</span>
          </motion.p>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease }}
          >
            Sahne ışığından sosyal medyaya, tek kareden komple sayfaya —
            fotoğraf, video ve web. Hepsi tek elden, sade ve net.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease }}
          >
            <Magnetic strength={0.5} range={110}>
              <a
                href="#fotograf"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Galeriye bak</span>
                <span className="relative transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.4} range={90}>
              <a
                href="#iletisim"
                className="gradient-border inline-block rounded-full px-7 py-3.5 text-sm font-medium text-foreground transition-shadow hover:shadow-[0_0_28px_-6px_rgba(125,164,255,0.35)]"
              >
                İletişime geç
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-md grid-cols-3 divide-x divide-border border-y border-border py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            {[
              { value: "3+", label: "yıl çekim" },
              { value: "2", label: "marka sitesi" },
              { value: "9+", label: "galeri karesi" },
            ].map((s, i) => (
              <div key={s.label} className="px-5 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl text-foreground md:text-3xl">
                  <StatValue value={s.value} delay={0.6 + i * 0.12} />
                </dd>
                <dd className="mt-1 font-mono text-[10px] tracking-widest text-muted uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
        >
          <div className="gradient-border relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-black/50">
            <div className="group/hero relative h-full w-full overflow-hidden rounded-3xl">
              <RGBSplitImage
                src={featured.src}
                alt={featured.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover/hero:scale-105"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] tracking-widest text-white/80 uppercase">
                  Son kare
                </span>
              </div>
              <p className="absolute bottom-4 left-4 font-mono text-xs text-foreground/90">
                {featured.caption}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-3xl border border-accent/20" aria-hidden />
          <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-3xl border border-[rgba(167,139,250,0.14)]" aria-hidden />
        </motion.div>
      </div>

      <motion.a
        href="#fotograf"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Aşağı kaydır"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Kaydır</span>
        <span className="block h-10 w-px animate-float bg-gradient-to-b from-accent via-accent/50 to-transparent" />
      </motion.a>
    </section>
  );
}
