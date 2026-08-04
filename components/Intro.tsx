"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Açılış intro'su: 0→100 sayaç + isim harf harf belirir, perde yukarı kalkar.
 * sessionStorage ile oturum başına yalnızca 1 kez gösterilir.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem("intro-seen")) return;
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // storage kapalıysa intro'yu yine de göster
    }
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    // 0 → 100 sayaç (~1.1sn, ease-out hissi için kademeli)
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  if (!show) return null;

  const letters = site.name.split("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060607]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease }}
          aria-hidden
        >
          <div className="overflow-hidden px-6">
            <p className="flex flex-wrap justify-center font-display text-[clamp(1.8rem,6vw,4rem)] font-bold tracking-tight text-foreground">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.028, ease }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </p>
          </div>
          <motion.div
            className="mt-6 h-px w-40 origin-left bg-gradient-to-r from-accent to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
          <p className="absolute bottom-8 right-8 font-display text-6xl font-bold text-foreground/20 tabular-nums md:text-8xl">
            {count}
          </p>
          <p className="absolute bottom-10 left-8 font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
            Fotoğraf · Video · Web
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
