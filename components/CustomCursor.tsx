"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorMode = "default" | "hover" | "label";

/**
 * Özel imleç: nokta + gecikmeli halka.
 * - Link/buton üzerinde halka büyür.
 * - [data-cursor="..."] taşıyan öğelerde etiketli daireye dönüşür (ör. "Gör →").
 * Yalnızca fine pointer + no-reduced-motion'da aktif.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as Element | null;
      const labelled = target?.closest?.("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.getAttribute("data-cursor") || "");
        return;
      }
      const interactive = target?.closest?.(
        "a, button, [role='button'], input, textarea, select, label",
      );
      setMode(interactive ? "hover" : "default");
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
      aria-hidden
    >
      {/* Nokta — imleci birebir takip eder */}
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: x, top: y, opacity: visible && mode !== "label" ? 1 : 0 }}
      />
      {/* Halka — spring ile gecikmeli takip */}
      <motion.div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2"
        style={{ left: ringX, top: ringY }}
        animate={{
          width: mode === "label" ? 84 : mode === "hover" ? 48 : 30,
          height: mode === "label" ? 84 : mode === "hover" ? 48 : 30,
          backgroundColor:
            mode === "label" ? "rgba(125,164,255,0.95)" : "rgba(125,164,255,0)",
          borderColor:
            mode === "label"
              ? "rgba(125,164,255,0)"
              : mode === "hover"
                ? "rgba(125,164,255,0.9)"
                : "rgba(125,164,255,0.45)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        initial={false}
      >
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              className="whitespace-nowrap text-xs font-semibold text-background"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
