"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useState } from "react";
import { cn } from "@/lib/cn";

const filters = [
  { id: "original", label: "Orijinal", className: "" },
  { id: "warm", label: "Sıcak", className: "brightness-105 sepia-[0.25] saturate-150" },
  { id: "mono", label: "Mono", className: "grayscale contrast-125" },
] as const;

const sampleSrc = site.gallery[1]?.src ?? asset("/gallery/02.svg");

export function PhotoPlayground() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("original");
  const filterClass = filters.find((f) => f.id === active)?.className ?? "";

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="05 — Deneme"
            title="Fotoğraf paleti"
            subtitle="CSS filtreleriyle üç ton — tıkla, önizle."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src={sampleSrc}
                alt="Filtre önizlemesi"
                fill
                className={cn("object-cover transition-all duration-500", filterClass)}
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
            <div className="flex flex-col gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    active === f.id
                      ? "border-accent bg-accent-dim text-foreground"
                      : "border-border text-muted hover:border-accent/30",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
