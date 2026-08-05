"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { RGBSplitImage } from "@/components/RGBSplitImage";
import { cn } from "@/lib/cn";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const galleryItems = site.gallery.map((g) => ({
  src: g.src,
  alt: g.alt,
  caption: g.caption,
  location: "location" in g ? g.location : undefined,
}));

function GalleryCard({
  item,
  index,
  onClick,
  wide,
}: {
  item: (typeof galleryItems)[number];
  index: number;
  onClick: () => void;
  wide: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <figure
      data-cursor="Gör →"
      className={cn(
        "gallery-card card-shine snap-item group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-background transition-all duration-500",
        wide
          ? "w-[min(85vw,420px)] border-accent/40 shadow-[0_0_30px_-10px_rgba(125,164,255,0.35)]"
          : "w-[min(70vw,320px)] border-border hover:border-accent/40",
      )}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]",
        )}
      >
        <RGBSplitImage
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 85vw, 420px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
        {/* Kamera vizörü köşeleri + hover HUD */}
        <div
          className="gallery-hud pointer-events-none absolute inset-3 z-20 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden
        >
          <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/70" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/70" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/70" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/70" />
          <span className="absolute right-2 top-2 font-mono text-[9px] tracking-[0.16em] text-white/75">
            RAW · 4:5
          </span>
          <span className="absolute left-2 top-2 flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
            REC
          </span>
        </div>
        <figcaption className="absolute bottom-0 left-0 right-0 p-5 transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-1 font-display text-lg text-foreground">
            {item.caption}
          </p>
          {item.location && (
            <p className="mt-0.5 text-xs text-muted">{item.location}</p>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  const next = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % galleryItems.length,
    );

  // Masaüstünde sticky pin + yatay kaydırma
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [shift, setShift] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      setShift(Math.max(0, row.scrollWidth + 128 - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (galleryItems.length - 1)) + 1;
    setCurrent(Math.min(galleryItems.length, Math.max(1, idx)));
  });

  return (
    <section
      id="fotograf"
      ref={sectionRef}
      className="relative scroll-mt-28 border-y border-border bg-surface/50"
      style={pinned && shift > 0 ? { height: `calc(100vh + ${shift}px)` } : undefined}
    >
      {pinned ? (
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Ghost başlık — ters yönde kayar */}
          <motion.p
            className="text-stroke pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 font-display text-[22vw] font-bold uppercase leading-none whitespace-nowrap opacity-40 select-none"
            style={{ x: ghostX }}
            aria-hidden
          >
            Galeri — Galeri
          </motion.p>

          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                index="03 — Fotoğraf"
                title="Işık ve an"
                subtitle="Kadraj, gölge ve günlük hayattan seçilmiş kareler. Büyütmek için tıkla."
                className="mb-0 md:mb-0"
              />
              <p className="shrink-0 pb-2 font-mono text-sm tracking-[0.2em] text-muted tabular-nums">
                <span className="text-accent">{String(current).padStart(2, "0")}</span>
                {" / "}
                {String(galleryItems.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <motion.div
            ref={rowRef}
            className="relative mt-10 flex w-max gap-6 px-16"
            style={{ x }}
          >
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.src}
                item={item}
                index={i}
                wide={i === 0}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <SectionHeading
                index="03 — Fotoğraf"
                title="Işık ve an"
                subtitle="Kadraj, gölge ve günlük hayattan seçilmiş kareler. Büyütmek için tıkla."
              />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent md:w-20"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent md:w-20"
                aria-hidden
              />
              <div className="mt-4 flex gap-4 overflow-x-auto px-6 pb-4 snap-x-mandatory md:gap-6">
                {galleryItems.map((item, i) => (
                  <GalleryCard
                    key={item.src}
                    item={item}
                    index={i}
                    wide={i === 0}
                    onClick={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-center px-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden
                >
                  <path d="M3 12h18M17 6l6 6-6 6" />
                </svg>
                Sürükle
              </span>
            </div>
          </Reveal>
        </div>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
