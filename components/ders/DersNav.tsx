import { BugvaLogo } from "@/components/BugvaLogo";
import { DersPrintButton } from "@/components/ders/DersPrintButton";
import Link from "next/link";

export function DersNav() {
  return (
    <header className="print-hidden fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="glass mx-auto flex max-w-3xl items-center justify-between rounded-full px-5 py-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-muted transition-colors hover:text-foreground"
          aria-label="Ana siteye dön"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          <BugvaLogo variant="full" className="h-5 md:h-6" />
        </Link>
        <p className="hidden font-mono text-[11px] tracking-[0.3em] text-muted uppercase sm:block">
          A4 afiş — 210 × 297 mm
        </p>
        <DersPrintButton className="gradient-border btn-shimmer cursor-pointer rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-foreground" />
      </div>
    </header>
  );
}
