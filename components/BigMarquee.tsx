"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const words = ["FOTOĞRAF", "VIDEO", "WEB"];

function Row({ reverse }: { reverse?: boolean }) {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div
      className={`flex w-max items-center gap-12 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee-slow"
      }`}
    >
      {items.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`font-display text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-none tracking-tight ${
            i % 2 === 0 ? "text-foreground" : "text-stroke"
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export function BigMarquee() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 120, damping: 30 });
  const skew = useTransform(smooth, [-1500, 0, 1500], [-4, 0, 4]);

  return (
    <div
      className="relative select-none overflow-hidden border-y border-border py-10 md:py-14"
      aria-hidden
    >
      <motion.div style={reduced ? undefined : { skewX: skew }}>
        <Row />
        {!reduced && (
          <div className="mt-3 opacity-50">
            <Row reverse />
          </div>
        )}
      </motion.div>
    </div>
  );
}
