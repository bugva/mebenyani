import Link from "next/link";
import { foto } from "@/content/foto";

export function FotoFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[var(--foto-border)] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="foto-display text-5xl text-[var(--foto-fg)]">{foto.brand}</p>
          <p className="foto-mono mt-3 text-[var(--foto-muted)]">
            © {year} · {foto.credit.note}
          </p>
        </div>
        <Link
          href={foto.credit.authorUrl}
          className="foto-mono text-[var(--foto-muted)] transition-colors hover:text-[var(--foto-accent)]"
        >
          ← {foto.credit.author}
        </Link>
      </div>
    </footer>
  );
}
