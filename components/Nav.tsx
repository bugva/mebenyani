"use client";

import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { openCommandPalette } from "@/components/CommandPalette";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    site.nav[0].sectionId,
  );
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 48);
  });

  useEffect(() => {
    const sectionIds = site.nav.map((n) => n.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
      <motion.div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled
            ? "glass shadow-lg shadow-black/30 ring-1 ring-accent/10"
            : "bg-transparent",
        )}
        layout
      >
        <Magnetic strength={0.6} range={50}>
          <a
            href="#"
            className="inline-block font-display text-sm font-semibold tracking-tight text-foreground md:text-base"
          >
            E<span className="text-accent">.</span>BA
          </a>
        </Magnetic>
        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = activeSection === item.sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-dim ring-1 ring-accent/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 font-mono text-[11px] text-muted transition-colors hover:border-accent/45 hover:text-foreground md:inline-flex"
            aria-label="Hızlı menüyü aç (Ctrl+K)"
            title="Hızlı menü (⌘K / Ctrl+K)"
          >
            ⌘K
          </button>
          <a
            href={site.instagram || "#iletisim"}
            {...(site.instagram
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="gradient-border hidden rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition-shadow hover:shadow-[0_0_24px_-4px_rgba(125,164,255,0.4)] md:inline-block"
          >
            Instagram
          </a>
          <button
            type="button"
            className="rounded-full px-3 py-2 text-sm text-muted md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menü"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>
      {open && (
        <nav className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm",
                    activeSection === item.sectionId
                      ? "bg-accent-dim text-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <button
                type="button"
                className="gradient-border mb-1 block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold text-foreground"
                onClick={() => {
                  setOpen(false);
                  openCommandPalette();
                }}
              >
                Hızlı menü
              </button>
              <a
                href={site.instagram || "#iletisim"}
                {...(site.instagram
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="gradient-border block rounded-xl px-4 py-3 text-center text-sm font-semibold text-foreground"
                onClick={() => setOpen(false)}
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
