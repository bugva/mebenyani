import { Reveal } from "@/components/Reveal";
import { ders } from "@/content/ders";
import Link from "next/link";

export function DersCta() {
  const { instagram, email } = ders.contact;

  return (
    <section id="iletisim" className="ders-mesh relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-10 text-center md:px-6 md:pt-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.35em] text-muted uppercase">
            İletişim &amp; kayıt
          </p>
          <h2 className="mt-5 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
            Derse <span className="text-shimmer">başla.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {ders.cta.subtext}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border btn-shimmer rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-foreground transition-shadow hover:shadow-[0_0_32px_-6px_rgba(125,164,255,0.5)]"
              >
                Instagram&apos;dan yaz ↗
              </a>
            )}
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("Özel ders — TYT/AYT")}`}
              className="rounded-full border border-border px-8 py-4 text-sm font-medium text-muted transition-colors hover:border-accent/45 hover:text-foreground"
            >
              E-posta gönder
            </a>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 pb-2 font-mono text-[11px] tracking-wider text-muted/80 md:flex-row">
          <p>© 2026 bugva — özel ders</p>
          <p className="uppercase">TYT · AYT — Matematik &amp; Fizik</p>
          <Link href="/" className="transition-colors hover:text-foreground">
            Siteye dön →
          </Link>
        </footer>
      </div>
    </section>
  );
}
