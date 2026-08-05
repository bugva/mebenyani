"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#·";

/** Metni rastgele gliflerden harf harf çözer — terminal/decode hissi. */
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (reduced) {
      const raf = requestAnimationFrame(() => setDisplay(text));
      return () => cancelAnimationFrame(raf);
    }
    const queue = text.split("").map((ch, i) => ({
      ch,
      start: 3 + i * 2,
      end: 3 + i * 2 + 10 + Math.floor(Math.random() * 8),
    }));
    const total = Math.max(...queue.map((q) => q.end), 1);
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      let out = "";
      let settled = true;
      for (const q of queue) {
        if (frame >= q.end) {
          out += q.ch;
        } else if (frame >= q.start) {
          settled = false;
          out += q.ch === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        } else {
          settled = false;
        }
      }
      setDisplay(out);
      if (!settled && frame <= total) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, reduced]);

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      <span aria-hidden>{display || " "}</span>
    </span>
  );
}
