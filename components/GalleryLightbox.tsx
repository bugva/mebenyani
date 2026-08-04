"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { useCallback, useEffect } from "react";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  location?: string;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal
      aria-label={item.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted hover:text-foreground"
        onClick={onClose}
      >
        Kapat
      </button>
      <button
        type="button"
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-surface p-3 text-foreground md:left-6 md:block"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Önceki"
      >
        ←
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-surface p-3 text-foreground md:right-6 md:block"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Sonraki"
      >
        →
      </button>
      <div
        className="relative max-h-[85vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/5] max-h-[75vh] w-full overflow-hidden rounded-2xl border border-border md:aspect-[3/2]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-xl text-foreground">{item.caption}</p>
            {item.location && (
              <p className="mt-1 font-mono text-xs text-muted uppercase tracking-wider">
                {item.location}
              </p>
            )}
          </div>
          <p className="font-mono text-xs text-muted">
            {index + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}
