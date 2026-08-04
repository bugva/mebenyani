"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="hizmetler"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 20% 35%, rgba(125,164,255,0.08), transparent 60%), radial-gradient(ellipse 40% 35% at 80% 70%, rgba(100,140,200,0.09), transparent 60%)",
        }}
        aria-hidden
      />
      <motion.p
        className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 font-mono text-[10vw] tracking-[0.25em] text-white/[0.035] uppercase lg:block"
        style={{
          x: useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-160, 140]),
          rotate: -90,
        }}
        aria-hidden
      >
        Production Services
      </motion.p>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                index="06 — Neler"
                title="Neler yapıyorum"
                subtitle="Web, fotoğraf, video ve editing — hepsi kişisel işler, resmi bir şirket değil."
              />
            </Reveal>
          </div>

          <div className="relative">
            <motion.div
              className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-white/10 md:block"
              aria-hidden
            >
              <motion.div
                className="w-full origin-top bg-gradient-to-b from-accent via-[rgba(100,140,200,0.75)] to-transparent"
                style={{ scaleY: scrollYProgress }}
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute left-3 top-0 hidden h-4 w-4 rounded-full border border-accent/60 bg-accent/30 shadow-[0_0_20px_rgba(125,164,255,0.6)] md:block"
              style={{
                y: useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 1rem)"]),
              }}
              aria-hidden
            />

            <div className="space-y-5">
            {site.services.map((service, i) => (
              <ServiceCard
                key={service.title}
                index={i}
                title={service.title}
                description={service.description}
                href={"href" in service ? service.href : "#iletisim"}
                scrollYProgress={scrollYProgress}
                reduced={!!reduced}
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  index,
  title,
  description,
  href,
  scrollYProgress,
  reduced,
}: {
  index: number;
  title: string;
  description: string;
  href: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const start = index * 0.12;
  const end = start + 0.42;
  const y = useTransform(scrollYProgress, [start, end], reduced ? [0, 0] : [90, -50]);
  const x = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [0, 0] : [index % 2 === 0 ? -48 : 48, 0],
  );
  const scale = useTransform(scrollYProgress, [start, end], reduced ? [1, 1] : [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const rotateX = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [0, 0] : [index % 2 === 0 ? 12 : -12, 0],
  );
  const rotateZ = useTransform(
    scrollYProgress,
    [start, end],
    reduced ? [0, 0] : [index % 2 === 0 ? -2 : 2, 0],
  );
  const glow = useTransform(scrollYProgress, [start, end], [0.1, 0.4]);
  const borderAlpha = useTransform(scrollYProgress, [start, end], [0.12, 0.4]);
  const shadow = useMotionTemplate`0 28px 80px -28px rgba(125, 164, 255, ${glow}), 0 14px 40px -20px rgba(0, 0, 0, 0.8)`;
  const borderColor = useMotionTemplate`rgba(125, 164, 255, ${borderAlpha})`;
  const blur = useTransform(scrollYProgress, [start, end], reduced ? [0, 0] : [2.2, 0]);
  const hue = useTransform(scrollYProgress, [start, end], reduced ? [0, 0] : [14, 0]);
  const filter = useMotionTemplate`blur(${blur}px) hue-rotate(${hue}deg)`;
  const topOffset = 110 + index * 22;

  // Mouse konumuna göre 3D tilt (yalnızca fine pointer)
  const cardRef = useRef<HTMLElement>(null);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const tiltEnabled = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 180, damping: 20 });
  const springY = useSpring(my, { stiffness: 180, damping: 20 });
  const tiltX = useTransform(springY, [-0.5, 0.5], tiltEnabled ? [7, -7] : [0, 0]);
  const tiltY = useTransform(springX, [-0.5, 0.5], tiltEnabled ? [-7, 7] : [0, 0]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        y,
        x,
        scale,
        opacity,
        rotateX,
        rotateZ,
        boxShadow: shadow,
        borderColor,
        filter,
        top: topOffset,
        transformPerspective: 900,
      }}
      className="card-shine group relative overflow-hidden rounded-2xl border bg-[rgba(10,10,12,0.8)] backdrop-blur-md transition-colors hover:border-accent/70 focus-within:border-accent lg:sticky"
    >
      <motion.div
        className="p-8"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
      >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_15%_12%,rgba(125,164,255,0.14),transparent_45%)] opacity-60" />
      <motion.div
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={
          reduced
            ? undefined
            : { x: ["-120%", "280%"] }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 1.8,
                delay: index * 0.18,
                repeat: Infinity,
                repeatDelay: 2.6,
                ease: "easeInOut",
              }
        }
        aria-hidden
      />
      <span className="font-mono text-4xl font-light text-accent/40">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-6 font-display text-xl font-semibold text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
        {description}
      </p>
      <p className="mt-8 inline-flex items-center gap-2 text-sm text-accent">
        İlgili işe git <span aria-hidden>↗</span>
      </p>
      <Link
        href={href}
        aria-label={`${title} — ilgili bölüme git`}
        className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
      />
      </motion.div>
    </motion.article>
  );
}
