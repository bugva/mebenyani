"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LensAlbum } from "@/lib/lens-gallery-types";

const ease = [0.16, 1, 0.3, 1] as const;

function formatDate(date?: string) {
  if (!date) return null;
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function FotoKonserHero({ album }: { album: LensAlbum }) {
  const dateLabel = formatDate(album.date);

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden">
      <Image
        src={album.cover.src}
        alt={album.cover.alt}
        fill
        className="object-cover opacity-60 grayscale-[20%]"
        sizes="100vw"
        priority
      />
      <div className="foto-lights" aria-hidden />
      <div className="foto-vignette" aria-hidden />

      <div className="relative w-full px-6 pb-14 pt-36 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="flex gap-5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="foto-bar" aria-hidden />
            <div>
              <p className="foto-label">Albüm</p>
              <h1 className="foto-display mt-2 max-w-5xl text-[clamp(3rem,12vw,7.5rem)] text-[var(--foto-fg)]">
                {album.title}
              </h1>
              <div className="foto-mono mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[var(--foto-muted)]">
                {album.venue && <span>{album.venue}</span>}
                {dateLabel && <span>{dateLabel}</span>}
                <span className="text-[var(--foto-accent)]">
                  {album.photoCount} fotoğraf
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
