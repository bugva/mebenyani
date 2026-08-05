"use client";

import { asset } from "@/lib/asset";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const CHARSET = " .·:;+*x%#@";
const SRC = asset("/gallery/02.svg");

/**
 * Galeri karesini canlı ASCII'ye çevirir — imleç yaklaştığında karakterler dağılır.
 * Piksel okuma offscreen canvas'ta; render rAF döngüsüyle.
 */
export function AsciiImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cancelled = false;
    let visible = false;
    let cells: { ch: string; lum: number; cx: number; cy: number }[] = [];
    const cellW = 9;
    const cellH = 11;

    const render = () => {
      if (!cells.length) return;
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cellH - 1}px ui-monospace, monospace`;
      ctx.textBaseline = "top";
      const m = mouseRef.current;
      for (const cell of cells) {
        let dx = 0;
        let dy = 0;
        let boost = 0;
        if (m) {
          const ddx = cell.cx - m.x;
          const ddy = cell.cy - m.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < 90) {
            const f = 1 - dist / 90;
            dx = (ddx / (dist || 1)) * f * 9;
            dy = (ddy / (dist || 1)) * f * 9;
            boost = f;
          }
        }
        const t = cell.cx / canvas.width;
        const r = Math.round(125 + (167 - 125) * t);
        const g = Math.round(164 + (139 - 164) * t);
        const b = Math.round(255 + (250 - 255) * t);
        const alpha = Math.min(1, cell.lum * 0.85 + boost * 0.6);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillText(cell.ch, cell.cx + dx, cell.cy + dy);
      }
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };

    const img = new Image();
    img.src = SRC;
    img.onload = () => {
      if (cancelled) return;
      const width = Math.min(wrap.clientWidth, 560);
      const cols = Math.max(48, Math.floor(width / cellW));
      const rows = Math.round(cols * (img.height / img.width) * 0.5);
      canvas.width = cols * cellW;
      canvas.height = rows * cellH;

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, cols, rows);
      let data: Uint8ClampedArray;
      try {
        data = octx.getImageData(0, 0, cols, rows).data;
      } catch {
        return;
      }
      cells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const ch =
            CHARSET[Math.min(CHARSET.length - 1, Math.floor(lum * CHARSET.length))];
          if (ch === " ") continue;
          cells.push({ ch, lum, cx: x * cellW, cy: y * cellH });
        }
      }
      render();
      if (!reduced && visible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced && cells.length) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = null;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl border border-border/60"
        role="img"
        aria-label="Galeri karesinin canlı ASCII çizimi"
      />
      <p className="mt-4 font-mono text-[10px] tracking-wider text-muted">
        kaynak: /gallery/02.svg — imleci üzerinde gezdir
      </p>
    </div>
  );
}
