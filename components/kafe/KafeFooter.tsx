import { kafe } from "@/content/kafe";
import Link from "next/link";

export function KafeFooter() {
  return (
    <footer className="border-t border-[var(--kafe-border)] bg-[var(--kafe-bg)] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kafe-display text-3xl text-[var(--kafe-espresso)]">
              {kafe.name}
            </p>
            <p className="mt-2 max-w-sm text-sm text-[var(--kafe-muted)]">
              {kafe.credit.text}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <nav className="flex flex-wrap gap-4">
              {kafe.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--kafe-muted)] hover:text-[var(--kafe-accent)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Link
              href={kafe.credit.authorUrl}
              className="text-sm font-medium text-[var(--kafe-accent)] underline-offset-2 hover:underline"
            >
              ← {kafe.credit.author}
            </Link>
          </div>
        </div>
        <p className="mt-12 border-t border-[var(--kafe-border)] pt-8 text-center text-xs text-[var(--kafe-muted)]">
          © {new Date().getFullYear()} {kafe.name}
        </p>
      </div>
    </footer>
  );
}
