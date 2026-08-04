"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { foto } from "@/content/foto";
import type { LensAlbum } from "@/lib/lens-gallery-types";

const ease = [0.16, 1, 0.3, 1] as const;

export function FotoHero({ latest }: { latest?: LensAlbum }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {latest && (
        <>
          <Image
            src={latest.cover.src}
            alt=""
            fill
            className="object-cover opacity-50 grayscale-[30%]"
            sizes="100vw"
            priority
            aria-hidden
          />
          <div className="foto-vignette" aria-hidden />
          <div className="foto-lights" aria-hidden />
        </>
      )}

      <div className="relative px-6 pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <span className="foto-live-dot" aria-hidden />
              <p className="foto-label">{foto.tagline}</p>
            </motion.div>

            <motion.h1
              className="foto-display text-[clamp(4.5rem,16vw,11rem)] text-[var(--foto-fg)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              {foto.brand}
            </motion.h1>

            <motion.p
              className="mt-8 max-w-md border-l-2 border-[var(--foto-accent)] pl-5 text-base leading-relaxed text-[var(--foto-muted)] md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              {foto.description}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
            >
              <a href="#galeri" className="foto-btn-primary">
                Konserler
              </a>
              <a href="#iletisim" className="foto-btn-ghost">
                İletişim
              </a>
            </motion.div>
          </div>

          {latest && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <Link
                href={`/projeler/fotograf/konser/${latest.slug}`}
                className="foto-album-card group relative block aspect-[3/4] max-w-sm lg:ml-auto"
              >
                <Image
                  src={latest.cover.src}
                  alt={latest.cover.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 90vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="foto-mono text-[var(--foto-accent-2)]">Son çekim</p>
                  <p className="foto-display mt-2 text-4xl text-white">
                    {latest.title}
                  </p>
                  {latest.venue && (
                    <p className="mt-2 text-sm text-white/70">{latest.venue}</p>
                  )}
                  <p className="foto-mono mt-4 text-white/50">
                    {latest.photoCount} kare →
                  </p>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        <p className="foto-mono mx-auto mt-16 max-w-6xl text-center text-[var(--foto-muted)]">
          ↓ Kaydır
        </p>
      </div>
    </section>
  );
}
