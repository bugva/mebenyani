"use client";

import Image from "next/image";
import { kafe } from "@/content/kafe";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function KafeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="kafe-mesh pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-end gap-12 px-6 pb-20 pt-32 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-36">
        <div>
          <motion.p
            className="text-xs font-medium tracking-[0.3em] text-[var(--kafe-accent)] uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {kafe.tagline}
          </motion.p>
          <motion.h1
            className="kafe-display mt-5 text-[clamp(3rem,10vw,5.5rem)] leading-[0.95] font-semibold text-[var(--kafe-espresso)]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
          >
            {kafe.name}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed text-[var(--kafe-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
          >
            {kafe.description}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
          >
            <a
              href="#menu"
              className="rounded-full bg-[var(--kafe-espresso)] px-8 py-3.5 text-sm font-medium text-[var(--kafe-cream)] shadow-md shadow-[var(--kafe-espresso)]/20 transition-transform hover:scale-[1.02]"
            >
              Menüyü gör
            </a>
            <a
              href="#konum"
              className="rounded-full border border-[var(--kafe-border)] bg-[var(--kafe-cream)]/80 px-8 py-3.5 text-sm font-medium text-[var(--kafe-fg)] transition-colors hover:border-[var(--kafe-accent)]"
            >
              Yol tarifi
            </a>
            <a
              href={kafe.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-3.5 text-sm font-medium text-[var(--kafe-espresso)] transition-colors hover:bg-[#25D366]/20"
            >
              {kafe.whatsapp.label}
            </a>
          </motion.div>
          <motion.ul
            className="mt-14 flex flex-wrap gap-8 border-t border-[var(--kafe-border)] pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, ease }}
          >
            {[
              { label: "Kavrum", value: "Haftalık" },
              { label: "Ortam", value: "Sessiz" },
              { label: "Konum", value: "Kızılay" },
            ].map((stat) => (
              <li key={stat.label}>
                <p className="text-[10px] tracking-widest text-[var(--kafe-muted)] uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 font-medium text-[var(--kafe-espresso)]">
                  {stat.value}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--kafe-border)] shadow-2xl shadow-[var(--kafe-espresso)]/15">
            <Image
              src={kafe.heroImage}
              alt="Demle Kahve — fincan illüstrasyonu"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-3xl border border-[var(--kafe-accent)]/30" />
          <div className="kafe-glass kafe-float absolute -left-4 bottom-12 rounded-2xl px-5 py-4 shadow-lg lg:-left-8">
            <p className="kafe-display text-2xl text-[var(--kafe-espresso)]">08:00</p>
            <p className="text-xs text-[var(--kafe-muted)]">Her gün açığız</p>
          </div>
        </motion.div>
      </div>

      <a
        href="#hikaye"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--kafe-muted)]"
        aria-label="Aşağı kaydır"
      >
        <span className="text-[10px] tracking-widest uppercase">Keşfet</span>
        <span className="block h-8 w-px bg-gradient-to-b from-[var(--kafe-accent)] to-transparent" />
      </a>
    </section>
  );
}
