"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Magnetic({
  children,
  className,
  strength = 0.45,
  range = 90,
}: {
  children: ReactNode;
  className?: string;
  /** How far the content travels relative to cursor offset (0–1). */
  strength?: number;
  /** Radius in px around the element's center where the pull kicks in. */
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const active = !reduced && !coarse;
    setEnabled(active);
    if (!active) return;

    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const relX = e.clientX - cx;
      const relY = e.clientY - cy;
      const dist = Math.hypot(relX, relY);

      if (dist < range) {
        const falloff = 1 - dist / range;
        x.set(relX * strength * falloff);
        y.set(relY * strength * falloff);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [range, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={enabled ? { x: springX, y: springY } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
