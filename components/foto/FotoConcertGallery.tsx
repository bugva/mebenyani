"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { LensAlbum } from "@/lib/lens-gallery-types";
import { FotoLightbox, type FotoLightboxItem } from "./FotoLightbox";

const ease = [0.22, 1, 0.36, 1] as const;

export function FotoConcertGallery({ album }: { album: LensAlbum }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems: FotoLightboxItem[] = album.photos.map((p) => ({
    src: p.src,
    alt: p.alt,
    caption: album.title,
    location: album.venue,
  }));

  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null
        ? null
        : (i - 1 + lightboxItems.length) % lightboxItems.length,
    );
  const next = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % lightboxItems.length,
    );

  return (
    <>
      <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {album.photos.map((photo, i) => (
          <motion.figure
            key={photo.src}
            className="group mb-1 break-inside-avoid cursor-pointer overflow-hidden border border-[var(--foto-border)] bg-[var(--foto-bg-elevated)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, delay: (i % 6) * 0.04, ease }}
            onClick={() => setLightboxIndex(i)}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
            </div>
          </motion.figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <FotoLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
