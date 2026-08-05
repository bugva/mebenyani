"use client";

import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useState } from "react";

/** Sağ altta yüzen, kaydırma ilerlemesini halka ile gösteren "yukarı dön" butonu. */
export function BackToTop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => setVisible(v > 0.08));

  return (
    <motion.button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }
      aria-label="Yukarı dön"
      className={cn(
        "glass fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full md:right-7 md:bottom-7",
        visible ? "pointer-events-auto" : "pointer-events-none",
      )}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.7,
        y: visible ? 0 : 12,
      }}
      transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden
      >
        <defs>
          <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7da4ff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <motion.circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="url(#btt-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      <span className="relative text-sm text-foreground" aria-hidden>
        ↑
      </span>
    </motion.button>
  );
}
