"use client";

import { kafe } from "@/content/kafe";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useEffect, useState } from "react";

export function KafeNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled ? "kafe-glass shadow-lg shadow-[var(--kafe-espresso)]/5" : "",
        )}
      >
        <Link
          href="/projeler/kahve"
          className="kafe-display text-xl font-semibold text-[var(--kafe-espresso)] md:text-2xl"
        >
          {kafe.name}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {kafe.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-[var(--kafe-muted)] transition-colors hover:bg-[var(--kafe-accent-soft)]/60 hover:text-[var(--kafe-espresso)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#menu"
          className="hidden rounded-full bg-[var(--kafe-espresso)] px-5 py-2.5 text-sm font-medium text-[var(--kafe-cream)] transition-transform hover:scale-[1.02] md:inline-block"
        >
          Menü
        </a>
        <button
          type="button"
          className="rounded-full px-3 py-2 text-[var(--kafe-muted)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="kafe-glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-1">
            {kafe.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm text-[var(--kafe-muted)] hover:bg-[var(--kafe-accent-soft)]/50"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#menu"
                className="mt-2 block rounded-full bg-[var(--kafe-espresso)] px-4 py-3 text-center text-sm font-medium text-[var(--kafe-cream)]"
                onClick={() => setOpen(false)}
              >
                Menüyü gör
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
