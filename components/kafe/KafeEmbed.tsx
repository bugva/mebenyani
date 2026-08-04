import { KafeReveal } from "@/components/kafe/KafeReveal";
import { site } from "@/content/site";

export function KafeEmbed() {
  return (
    <section className="border-t border-[var(--kafe-border)] bg-[var(--kafe-cream)] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <KafeReveal>
          <p className="text-xs font-medium tracking-[0.2em] text-[var(--kafe-accent)] uppercase">
            İletişim
          </p>
          <h2 className="kafe-display mt-3 text-2xl text-[var(--kafe-espresso)]">
            Yazışmak istersen
          </h2>
          <p className="mt-2 text-sm text-[var(--kafe-muted)]">
            Bu bir demo sayfa — gerçek iletişim ana sitede e-posta veya Instagram
            üzerinden.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-[var(--kafe-espresso)] px-5 py-2.5 text-sm font-medium text-[var(--kafe-cream)]"
            >
              {site.email}
            </a>
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[var(--kafe-border)] px-5 py-2.5 text-sm font-medium text-[var(--kafe-espresso)]"
              >
                Instagram
              </a>
            )}
          </div>
        </KafeReveal>
      </div>
    </section>
  );
}
