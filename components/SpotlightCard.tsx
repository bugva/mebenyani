"use client";

import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Mouse'u takip eden radyal spotlight efektli kart sarmalayıcı.
 *  `tilt` verilirse kart mouse konumuna göre 3D eğilir. */
export function SpotlightCard({
  className,
  children,
  tilt = false,
}: {
  className?: string;
  children: React.ReactNode;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const tiltEnabled = tilt && fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 22 });
  const springY = useSpring(my, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], tiltEnabled ? [6, -6] : [0, 0]);
  const rotateY = useTransform(springX, [-0.5, 0.5], tiltEnabled ? [-6, 6] : [0, 0]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    if (tiltEnabled) {
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={
        tiltEnabled
          ? { rotateX, rotateY, transformPerspective: 800 }
          : undefined
      }
      className={cn("spotlight-card", className)}
    >
      {children}
    </motion.div>
  );
}
