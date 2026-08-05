"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/** Scroll ile yavaşça dönen, sayfanın arkasındaki atmosferik yörünge çizgileri. */
export function AmbientOrbits() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 115]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -right-[28rem] top-[12vh] h-[58rem] w-[58rem] rounded-full border border-accent/[0.055]"
        style={reduced ? undefined : { rotate, y }}
      >
        <div className="absolute inset-[12%] rounded-full border border-white/[0.035]" />
        <div className="absolute inset-[27%] rounded-full border border-accent-2/[0.055]" />
        <span className="absolute left-[15%] top-[12%] h-1.5 w-1.5 rounded-full bg-accent/50 shadow-[0_0_14px_rgba(125,164,255,0.8)]" />
        <span className="absolute bottom-[24%] left-[8%] h-1 w-1 rounded-full bg-accent-2/50" />
      </motion.div>
      <motion.div
        className="absolute -left-[22rem] bottom-[-30rem] h-[50rem] w-[50rem] rounded-full border border-white/[0.025]"
        style={reduced ? undefined : { rotate: rotateReverse }}
      >
        <div className="absolute inset-[19%] rounded-full border border-accent/[0.04]" />
        <span className="absolute right-[8%] top-1/2 h-1.5 w-1.5 rounded-full bg-accent/40 shadow-[0_0_12px_rgba(125,164,255,0.65)]" />
      </motion.div>
    </div>
  );
}
