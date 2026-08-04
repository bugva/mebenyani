"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LensAlbum } from "@/lib/lens-gallery-types";
import { lensUploadHint } from "@/lib/lens-gallery-types";
import { FotoReveal } from "./FotoReveal";

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

export function FotoConcertGrid({ albums }: { albums: LensAlbum[] }) {
  if (albums.length === 0) {
    return (
      <FotoReveal>
        <div className="mt-12 border border-dashed border-[var(--foto-border)] bg-[var(--foto-bg-elevated)] p-12 text-center">
          <p className="foto-display text-4xl text-[var(--foto-fg)]">
            Albüm yok
          </p>
          <p className="foto-mono mx-auto mt-4 max-w-md text-[var(--foto-muted)]">
            {lensUploadHint.folder} · {lensUploadHint.coverFile}
          </p>
        </div>
      </FotoReveal>
    );
  }

  return (
    <div className="mt-14 grid gap-px bg-[var(--foto-border)] sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album, i) => (
        <motion.div
          key={album.slug}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05, ease }}
          className="bg-[var(--foto-bg)]"
        >
          <Link
            href={`/projeler/fotograf/konser/${album.slug}`}
            className="foto-album-card group block"
          >
            <figure className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={album.cover.src}
                alt={album.cover.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-5 md:p-6">
                <p className="foto-mono text-[var(--foto-accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="foto-display mt-2 text-4xl text-white md:text-5xl">
                  {album.title}
                </p>
                {album.venue && (
                  <p className="mt-1 text-sm text-white/70">{album.venue}</p>
                )}
                {album.date && (
                  <p className="foto-mono mt-1 text-white/45">
                    {formatDate(album.date)}
                  </p>
                )}
                <p className="foto-mono mt-3 text-[var(--foto-accent-2)]">
                  {album.photoCount} kare →
                </p>
              </figcaption>
            </figure>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
