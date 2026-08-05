"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const PALETTE = ["#7da4ff", "#a78bfa", "#d4b46a", "#f5f3ec"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Akış alanı (flow-field) üretken sanat — her seed benzersiz bir kompozisyon çizer.
 * Sadece canvas 2D; kütüphane yok. PNG olarak indirilebilir.
 */
export function GenerativeArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const [running, setRunning] = useState(false);
  const reduced = useReducedMotion();

  const draw = useCallback(
    (seedValue: number) => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      cancelAnimationFrame(rafRef.current);

      const width = Math.min(wrap.clientWidth, 720);
      const height = Math.round(width * 0.66);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rand = mulberry32(seedValue);
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = "lighter";

      const fieldA = rand() * 8 + 2;
      const fieldB = rand() * 8 + 2;
      const drift = rand() * Math.PI * 2;
      const steps = 90;
      const perFrame = 6;

      const pts = Array.from({ length: 700 }, () => ({
        x: rand() * width,
        y: rand() * height,
        color: PALETTE[(rand() * PALETTE.length) | 0],
        speed: 0.6 + rand() * 1.1,
      }));

      const stepAll = (count: number) => {
        for (let s = 0; s < count; s++) {
          for (const p of pts) {
            const n =
              Math.sin(p.x * 0.004 * fieldA + drift) +
              Math.cos(p.y * 0.004 * fieldB - drift);
            const angle = n * Math.PI * 0.9;
            const nx = p.x + Math.cos(angle) * p.speed;
            const ny = p.y + Math.sin(angle) * p.speed;
            ctx.globalAlpha = 0.28;
            ctx.strokeStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nx, ny);
            ctx.stroke();
            p.x = nx;
            p.y = ny;
            if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
              p.x = rand() * width;
              p.y = rand() * height;
            }
          }
        }
      };

      if (reduced) {
        stepAll(steps);
        return;
      }

      setRunning(true);
      const totalFrames = Math.ceil(steps / perFrame);
      let frame = 0;
      const loop = () => {
        stepAll(perFrame);
        frame += 1;
        if (frame < totalFrames) {
          rafRef.current = requestAnimationFrame(loop);
        } else {
          setRunning(false);
        }
      };
      rafRef.current = requestAnimationFrame(loop);
    },
    [reduced],
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          draw(seed);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, seed]);

  const regenerate = () => {
    const next = Math.floor(Math.random() * 1e9);
    setSeed(next);
    draw(next);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `bugva-generative-${seed.toString(16)}.png`;
    a.click();
  };

  return (
    <div ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl border border-border/60"
        role="img"
        aria-label="Üretken akış alanı çizimi"
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={regenerate}
          className="rounded-full border border-border px-4 py-2 font-mono text-[11px] tracking-wider text-muted uppercase transition-colors hover:border-accent/45 hover:text-foreground"
        >
          ↻ yeniden üret
        </button>
        <button
          type="button"
          onClick={download}
          className="rounded-full border border-border px-4 py-2 font-mono text-[11px] tracking-wider text-muted uppercase transition-colors hover:border-accent/45 hover:text-foreground"
        >
          PNG indir
        </button>
        <span
          className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] text-muted"
          suppressHydrationWarning
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              running ? "animate-pulse bg-accent" : "bg-border",
            )}
            aria-hidden
          />
          seed: {seed.toString(16)}
        </span>
      </div>
    </div>
  );
}
