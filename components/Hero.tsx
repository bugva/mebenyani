"use client";

import { site } from "@/content/site";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { HeroVisual } from "@/components/HeroVisual";
import { ScrambleText } from "@/components/ScrambleText";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;
const roles = ["Fotoğraf", "Video", "Web"];

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
      duration: 1.1,
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
              const delay = baseDelay + letterIndex * 0.028;
              letterIndex += 1;
              return (
                <motion.span
                  key={i}
                  className={cn("inline-block cursor-default", letterClassName)}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.65, delay, ease }}
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
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-20 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_20%,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <motion.p
            className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            Ankara
          </motion.p>

          <motion.h1
            className="mt-6 font-display text-[clamp(3rem,9vw,6.25rem)] font-bold leading-[0.92] tracking-tight text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <NameLine text={site.name.split(" ")[0]} baseDelay={0.1} />
            <NameLine
              text={site.name.split(" ").slice(1).join(" ")}
              baseDelay={0.28}
            />
          </motion.h1>

          <motion.p
            className="mt-7 flex items-baseline gap-3 font-mono text-sm tracking-wider text-muted"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
          >
            <ScrambleText text={roles[roleIndex]} className="text-foreground" />
          </motion.p>

          <motion.p
            className="mt-8 max-w-sm text-base leading-relaxed text-muted"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease }}
          >
            Az şey. Net sonuç. Gereksiz olanı keserim.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease }}
          >
            <Magnetic strength={0.4} range={90}>
              <a
                href="#fotograf"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Galeri
              </a>
            </Magnetic>
            <Magnetic strength={0.35} range={80}>
              <a
                href="#iletisim"
                className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                Yaz
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            className="mt-16 grid max-w-sm grid-cols-3 gap-6 border-t border-border pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {[
              { value: "3+", label: "Yıl" },
              { value: "2", label: "Site" },
              { value: "9+", label: "Kare" },
            ].map((s, i) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl text-foreground">
                  <StatValue value={s.value} delay={0.55 + i * 0.1} />
                </dd>
                <dd className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
