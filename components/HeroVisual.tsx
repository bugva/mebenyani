"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

/** Kibirli sadelik paneli: tek monogram, tek halka, minimum HUD. */
export function HeroVisual() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const x = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const y = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-[#080809]"
    >
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="relative grid h-[70%] w-[70%] place-items-center"
          style={reduced ? undefined : { x, y }}
        >
          <div
            className="absolute inset-0 rounded-full border border-white/[0.08]"
            aria-hidden
          />
          <div
            className="absolute inset-[18%] rounded-full border border-white/[0.05]"
            aria-hidden
          />
          <p className="relative font-display text-[clamp(4.5rem,14vw,7rem)] font-bold leading-none tracking-tight text-foreground">
            bv
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">
        <span className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
          bugva
        </span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
          Ankara
        </span>
      </div>
    </div>
  );
}
