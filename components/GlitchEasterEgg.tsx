"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TRIGGER = "bugva";
const GLITCH_EVENT = "bugva-glitch";

export function triggerGlitch() {
  window.dispatchEvent(new CustomEvent(GLITCH_EVENT));
}

/**
 * Gizli mod: klavyeden "bugva" yazınca (veya ⌘K paletinden tetiklenince)
 * site birkaç saniyeliğine glitch'e girer.
 */
export function GlitchEasterEgg() {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(0);

  useEffect(() => {
    const buffer: string[] = [];
    const activate = () => {
      setActive(true);
      document.documentElement.classList.add("bugva-glitch");
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setActive(false);
        document.documentElement.classList.remove("bugva-glitch");
      }, 3400);
    };
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer.push(e.key.toLowerCase());
      if (buffer.length > TRIGGER.length) buffer.shift();
      if (buffer.join("") === TRIGGER) activate();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(GLITCH_EVENT, activate);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(GLITCH_EVENT, activate);
      window.clearTimeout(timeoutRef.current);
      document.documentElement.classList.remove("bugva-glitch");
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          aria-hidden
        >
          <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-[rgba(167,139,250,0.6)] to-transparent" />
          <div className="relative select-none font-display text-[22vw] font-bold leading-none tracking-tight md:text-[11rem]">
            <span className="glitch-layer glitch-layer-a absolute inset-0 text-accent">
              bugva
            </span>
            <span className="glitch-layer glitch-layer-b absolute inset-0 text-accent-2">
              bugva
            </span>
            <span className="glitch-base relative text-foreground">bugva</span>
          </div>
          <p className="absolute bottom-12 font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
            bugva://glitch — gizli mod #01
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
