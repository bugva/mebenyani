"use client";

import { FotoReveal } from "./FotoReveal";

export function FotoSectionHead({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FotoReveal>
      <div className="flex gap-5">
        <div className="foto-bar" aria-hidden />
        <div>
          <p className="foto-label">{label}</p>
          <h2 className="foto-display mt-3 text-5xl text-[var(--foto-fg)] md:text-6xl lg:text-7xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--foto-muted)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </FotoReveal>
  );
}
