"use client";

import type { ReactNode } from "react";

/**
 * Afiş içi kaydırma: sayfa sabit (fixed) bir kapsayıcıda aktığı için
 * Lenis'in global hash yakalayıcısına takılmadan native scrollIntoView kullanır.
 */
export function DersScrollButton({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    >
      {children}
    </button>
  );
}
