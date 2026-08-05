"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
};

/** Hafif canvas parçacıklarıyla imlecin arkasında kısa bir ışık izi bırakır. */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let lastX = -100;
    let lastY = -100;
    let lastSpawn = 0;
    const particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (e: PointerEvent) => {
      const now = performance.now();
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (distance < 5 || now - lastSpawn < 18) return;
      const count = Math.min(3, Math.max(1, Math.floor(distance / 18)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 5,
          y: e.clientY + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 0.45,
          vy: -0.2 - Math.random() * 0.35,
          life: 1,
          size: 1 + Math.random() * 1.8,
          hue: Math.random() > 0.45 ? 220 : 265,
        });
      }
      if (particles.length > 55) particles.splice(0, particles.length - 55);
      lastX = e.clientX;
      lastY = e.clientY;
      lastSpawn = now;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035;
        p.size *= 0.985;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, `hsla(${p.hue}, 100%, 78%, ${p.life * 0.8})`);
        glow.addColorStop(0.35, `hsla(${p.hue}, 95%, 68%, ${p.life * 0.3})`);
        glow.addColorStop(1, `hsla(${p.hue}, 90%, 60%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[89] hidden md:block"
      aria-hidden
    />
  );
}
