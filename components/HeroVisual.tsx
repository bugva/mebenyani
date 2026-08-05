"use client";

import { ScrambleText } from "@/components/ScrambleText";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const signals = [
  { label: "Lens", value: "f/1.8 · 85mm" },
  { label: "Kurgu", value: "24fps · Rec.709" },
  { label: "Web", value: "Next · TS" },
];

/**
 * Hero sağ paneli: foto yerine imlece tepki veren lens/sinyal görseli.
 * Aperture halkaları, monogram ve canlı HUD — kütüphane yok.
 */
export function HeroVisual() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: "00.0", y: "00.0" });
  const [clock, setClock] = useState("--:--");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });

  const ringRotate = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const ringRotate2 = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const floatX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const floatY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const glowX = useTransform(sx, [-0.5, 0.5], [30, 70]);
  const glowY = useTransform(sy, [-0.5, 0.5], [30, 70]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(125,164,255,0.18), transparent 55%)`;

  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Istanbul",
        }).format(new Date()),
      );
    const start = requestAnimationFrame(tick);
    const id = setInterval(tick, 30_000);
    return () => {
      cancelAnimationFrame(start);
      clearInterval(id);
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx);
    my.set(ny);
    setCoords({
      x: (nx * 100).toFixed(1),
      y: (ny * 100).toFixed(1),
    });
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setCoords({ x: "00.0", y: "00.0" });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="gradient-border relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#0a0a0c] shadow-2xl shadow-black/50"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/80 uppercase">
            signal · live
          </span>
        </div>
        <div className="text-right font-mono text-[10px] tracking-wider text-white/55">
          <p>ANKARA · {clock}</p>
          <p className="mt-1 tabular-nums">
            x {coords.x} · y {coords.y}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="relative grid h-[68%] w-[68%] place-items-center"
          style={
            reduced
              ? undefined
              : { x: floatX, y: floatY, rotate: ringRotate }
          }
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-accent/25"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={
              reduced
                ? undefined
                : { duration: 28, repeat: Infinity, ease: "linear" }
            }
            aria-hidden
          >
            <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(125,164,255,0.9)]" />
            <span className="absolute bottom-[18%] left-[8%] h-1.5 w-1.5 rounded-full bg-accent-2/80" />
          </motion.div>
          <motion.div
            className="absolute inset-[12%] rounded-full border border-dashed border-white/15"
            style={reduced ? undefined : { rotate: ringRotate2 }}
            aria-hidden
          />
          <div
            className="absolute inset-[24%] rounded-full border border-accent-2/20"
            aria-hidden
          />
          <div
            className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(125,164,255,0.18),rgba(10,10,12,0.2)_55%,transparent_70%)]"
            aria-hidden
          />

          <div className="relative text-center">
            <p className="font-mono text-[10px] tracking-[0.28em] text-accent uppercase">
              bugva
            </p>
            <p className="mt-2 font-display text-[clamp(3.5rem,12vw,5.5rem)] font-bold leading-none tracking-tight text-shimmer">
              bv
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
              <ScrambleText text="foto · video · web" />
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <div className="grid grid-cols-3 gap-2">
          {signals.map((item, i) => (
            <motion.div
              key={item.label}
              className="rounded-xl border border-white/10 bg-black/40 px-2.5 py-2.5 backdrop-blur-md"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
            >
              <p className="font-mono text-[9px] tracking-[0.16em] text-accent uppercase">
                {item.label}
              </p>
              <p className="mt-1 truncate text-[11px] text-foreground/90">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-4" aria-hidden>
        <span className="absolute top-0 left-0 h-5 w-5 border-t border-l border-white/35" />
        <span className="absolute top-0 right-0 h-5 w-5 border-t border-r border-white/35" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/35" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/35" />
      </div>
    </div>
  );
}
