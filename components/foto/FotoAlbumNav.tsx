"use client";

import Image from "next/image";
import Link from "next/link";
import type { LensAlbum } from "@/lib/lens-gallery-types";

function AlbumLink({
  album,
  direction,
}: {
  album: LensAlbum;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/projeler/fotograf/konser/${album.slug}`}
      className="group flex items-center gap-5 border border-[var(--foto-border)] p-5 transition-colors hover:border-[var(--foto-border-hover)] md:p-6"
    >
      {!isNext && (
        <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden md:w-20">
          <Image
            src={album.cover.src}
            alt={album.cover.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            sizes="80px"
          />
        </div>
      )}
      <div className={isNext ? "ml-auto text-right" : ""}>
        <p className="foto-label">
          {isNext ? "Sonraki →" : "← Önceki"}
        </p>
        <p className="foto-display mt-2 text-2xl text-[var(--foto-fg)] md:text-3xl">
          {album.title}
        </p>
        {album.venue && (
          <p className="foto-mono mt-1 text-[var(--foto-muted)]">{album.venue}</p>
        )}
      </div>
      {isNext && (
        <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden md:w-20">
          <Image
            src={album.cover.src}
            alt={album.cover.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            sizes="80px"
          />
        </div>
      )}
    </Link>
  );
}

export function FotoAlbumNav({
  prev,
  next,
}: {
  prev: LensAlbum | null;
  next: LensAlbum | null;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-6 grid gap-px bg-[var(--foto-border)] sm:grid-cols-2">
      {prev && (
        <div className="bg-[var(--foto-bg)]">
          <AlbumLink album={prev} direction="prev" />
        </div>
      )}
      {next && (
        <div className="bg-[var(--foto-bg)]">
          <AlbumLink album={next} direction="next" />
        </div>
      )}
    </div>
  );
}
