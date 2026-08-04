"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, { stiffness: 120, damping: 22 });
  const y = useSpring(0, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] hidden md:block" aria-hidden>
      <motion.div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: x,
          top: y,
          background:
            "radial-gradient(circle, rgba(125,164,255,0.12) 0%, rgba(167,139,250,0.06) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
