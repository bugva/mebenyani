"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

export type FotoLightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
};

export function FotoLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: FotoLightboxItem[];
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

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <button
            type="button"
            className="foto-mono absolute right-4 top-4 z-10 border border-white/20 bg-black px-4 py-2 text-white/80 transition-colors hover:border-[var(--foto-accent)] hover:text-white md:right-8 md:top-8"
            onClick={onClose}
          >
            Kapat
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-white/20 bg-black p-3 text-white transition-colors hover:border-[var(--foto-accent)] md:left-8"
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
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-white/20 bg-black p-3 text-white transition-colors hover:border-[var(--foto-accent)] md:right-8"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Sonraki"
          >
            →
          </button>
          <motion.div
            className="relative max-h-[88vh] w-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden border border-white/15 md:aspect-[16/10] md:max-h-[72vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.src}
                  className="relative h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain"
                    sizes="95vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex items-end justify-between gap-6 px-1">
              <div>
                <p className="foto-display text-3xl text-white md:text-4xl">
                  {item.caption ?? item.alt}
                </p>
                {item.location && (
                  <p className="mt-2 text-xs tracking-[0.2em] text-white/50 uppercase">
                    {item.location}
                  </p>
                )}
              </div>
              <p className="shrink-0 font-mono text-xs text-white/40">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
