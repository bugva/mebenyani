"use client";

import { site } from "@/content/site";
import { BugvaLogo } from "@/components/BugvaLogo";
import { triggerGlitch } from "@/components/GlitchEasterEgg";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const OPEN_EVENT = "open-command-palette";

type Action = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  keepOpen?: boolean;
  run: () => void;
};

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function CommandPalette() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const go = useCallback(
    (hash: string) => {
      if (window.location.pathname !== "/") {
        router.push(`/${hash}`);
        return;
      }
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    },
    [router, reduced],
  );

  const actions = useMemo<Action[]>(() => {
    const list: Action[] = site.nav.map((n) =>
      n.href.startsWith("/")
        ? {
            id: `page-${n.sectionId}`,
            label: n.label,
            hint: "Sayfa",
            keywords: n.sectionId,
            run: () => router.push(n.href),
          }
        : {
            id: `section-${n.sectionId}`,
            label: `${n.label} bölümüne git`,
            hint: "Bölüm",
            keywords: n.sectionId,
            run: () => go(n.href),
          },
    );
    list.push(
      {
        id: "page-yazilar",
        label: "Yazılar",
        hint: "Sayfa",
        keywords: "blog yazi",
        run: () => router.push("/yazilar"),
      },
      {
        id: "page-foto",
        label: "Fotoğraf projesi",
        hint: "Sayfa",
        keywords: "proje galeri konser",
        run: () => router.push("/projeler/fotograf"),
      },
      {
        id: "page-kahve",
        label: "Kahve projesi",
        hint: "Sayfa",
        keywords: "proje kafe",
        run: () => router.push("/projeler/kahve"),
      },
      {
        id: "page-teklif",
        label: "Teklif al",
        hint: "Sayfa",
        keywords: "fiyat form",
        run: () => router.push("/teklif"),
      },
      {
        id: "top",
        label: "Başa dön",
        hint: "Eylem",
        keywords: "yukari top",
        run: () =>
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }),
      },
      {
        id: "glitch",
        label: "Glitch modunu tetikle",
        hint: "Easter egg",
        keywords: "gizli bugva eglence mod",
        run: triggerGlitch,
      },
      {
        id: "copy-email",
        label: "E-postayı kopyala",
        hint: "Eylem",
        keywords: "mail email iletisim",
        keepOpen: true,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          });
        },
      },
    );
    if (site.instagram) {
      list.push({
        id: "instagram",
        label: "Instagram'ı aç",
        hint: "Bağlantı",
        keywords: "sosyal dm",
        run: () => window.open(site.instagram, "_blank", "noopener"),
      });
    }
    return list;
  }, [go, router, reduced]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.keywords ?? ""}`.toLocaleLowerCase("tr").includes(q),
    );
  }, [actions, query]);

  const close = useCallback(() => setOpen(false), []);
  const openPalette = useCallback(() => {
    setQuery("");
    setActive(0);
    setCopied(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openPalette();
      }
    };
    window.addEventListener(OPEN_EVENT, openPalette);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, openPalette);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, openPalette, close]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runAction = useCallback(
    (action: Action) => {
      action.run();
      if (!action.keepOpen) close();
    },
    [close],
  );

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = filtered[active];
      if (action) runAction(action);
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Hızlı menü"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            className="glass relative w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-accent/15"
            initial={{ opacity: 0, y: reduced ? 0 : -14, scale: reduced ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0 : 0.22, ease }}
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <BugvaLogo variant="mark" className="h-4 w-4 shrink-0" />
              <span className="font-mono text-xs text-accent" aria-hidden>
                ⌘K
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Bölüm, sayfa veya eylem ara…"
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted/70"
                aria-label="Hızlı menüde ara"
              />
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:border-accent/45 hover:text-foreground"
              >
                esc
              </button>
            </div>

            <ul ref={listRef} className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-muted">
                  Sonuç yok — başka bir şey dene.
                </li>
              )}
              {filtered.map((action, i) => (
                <li key={action.id} data-index={i}>
                  <button
                    type="button"
                    onClick={() => runAction(action)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left text-sm transition-colors",
                      i === active
                        ? "bg-accent-dim text-foreground ring-1 ring-accent/25"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          i === active ? "bg-accent" : "bg-border",
                        )}
                        aria-hidden
                      />
                      {action.id === "copy-email" && copied
                        ? "Kopyalandı ✓"
                        : action.label}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] tracking-widest text-muted/70 uppercase">
                      {action.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-t border-border px-5 py-3 font-mono text-[10px] tracking-wider text-muted/70">
              <span>↑↓ gez</span>
              <span>↵ seç</span>
              <span>esc kapat</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
