"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Sayfa geçiş overlay'i: route değişiminde perde alttan yükselip üstten açılır.
 * İlk yüklemede (Intro varken) gösterilmez; yalnızca navigasyonlarda devreye girer.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (reduced) return;
    if (first.current) {
      first.current = false;
      return;
    }
    setActive(true);
    const id = setTimeout(() => setActive(false), 620);
    return () => clearTimeout(id);
  }, [pathname, reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={pathname + "-veil"}
          className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-[#060607]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease }}
          aria-hidden
        >
          <motion.p
            className="font-mono text-[11px] tracking-[0.4em] text-muted uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.2, ease }}
          >
            Emir Buğra Aydoğan
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
