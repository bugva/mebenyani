"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const words = ["Fotoğraf", "Video", "Web", "Edit", "Kurgu", "Tasarım"];

function Row({
  reverse,
  outline,
}: {
  reverse?: boolean;
  outline?: boolean;
}) {
  const items = [...words, ...words, ...words];

  return (
    <div
      className={`flex w-max items-center gap-10 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee-slow"
      }`}
    >
      {items.map((word, i) => (
        <span key={`${word}-${i}`} className="flex shrink-0 items-center gap-10">
          <span
            className={`font-display text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-none tracking-tight ${
              outline
                ? i % 2 === 0
                  ? "text-stroke"
                  : "text-foreground/90"
                : i % 2 === 0
                  ? "text-accent/80"
                  : "text-stroke"
            }`}
          >
            {word}
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-accent/50" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export function BigMarquee() {
  const reduced = useReducedMotion();

  // Scroll hızına göre şerit hafifçe eğilir — kinetik his
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 30 });
  const skew = useTransform(smooth, [-1500, 0, 1500], [-6, 0, 6]);

  return (
    <div
      className="relative select-none overflow-hidden border-y border-border bg-surface/20 py-10 md:py-14"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />
      <motion.div style={reduced ? undefined : { skewX: skew }}>
        <Row outline />
        {!reduced && (
          <div className="mt-4 opacity-70 md:mt-6">
            <Row reverse />
          </div>
        )}
      </motion.div>
    </div>
  );
}
