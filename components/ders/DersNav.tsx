import { BugvaLogo } from "@/components/BugvaLogo";
import { ders } from "@/content/ders";
import Link from "next/link";

export function DersNav() {
  const cta = ders.contact.instagram
    ? { href: ders.contact.instagram, external: true }
    : { href: `mailto:${ders.contact.email}`, external: false };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3">
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
        <p className="hidden font-mono text-[11px] tracking-[0.3em] text-muted uppercase md:block">
          TYT · AYT — Matematik &amp; Fizik
        </p>
        <a
          href={cta.href}
          {...(cta.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="gradient-border btn-shimmer rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-foreground"
        >
          İletişim
        </a>
      </div>
    </header>
  );
}
