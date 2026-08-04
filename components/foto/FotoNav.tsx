"use client";

import Link from "next/link";
import { foto } from "@/content/foto";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

export function FotoNav({
  backHref,
  backLabel,
}: {
  backHref?: string;
  backLabel?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--foto-border)] bg-[var(--foto-bg)]/95"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/projeler/fotograf"
          className="foto-display text-3xl tracking-[0.08em] text-[var(--foto-fg)] md:text-4xl"
        >
          {foto.brand}
        </Link>

        {backHref ? (
          <Link
            href={backHref}
            className="foto-mono text-[var(--foto-muted)] transition-colors hover:text-[var(--foto-accent-2)]"
          >
            {backLabel ?? "← Geri"}
          </Link>
        ) : (
          <nav className="hidden items-center gap-10 md:flex">
            {foto.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="foto-mono text-[var(--foto-muted)] transition-colors hover:text-[var(--foto-fg)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
