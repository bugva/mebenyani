import { kafe } from "@/content/kafe";
import { KafeReveal } from "@/components/kafe/KafeReveal";

export function KafeMenu() {
  return (
    <section id="menu" className="scroll-mt-28 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <KafeReveal>
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.25em] text-[var(--kafe-accent)] uppercase">
              Menü
            </p>
            <h2 className="kafe-display mt-4 text-4xl font-semibold text-[var(--kafe-espresso)] md:text-5xl">
              Bugün ne içelim?
            </h2>
            <p className="mt-4 text-[var(--kafe-muted)]">
              Fiyatlar KDV dahildir. Günlük tatlı stokları değişebilir.
            </p>
          </div>
        </KafeReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {kafe.menu.map((group, gi) => (
            <KafeReveal key={group.category} delay={gi * 0.1}>
              <article className="h-full rounded-3xl border border-[var(--kafe-border)] bg-[var(--kafe-cream)] p-8 shadow-sm">
                <h3 className="kafe-display border-b border-[var(--kafe-border)] pb-4 text-2xl text-[var(--kafe-espresso)]">
                  {group.category}
                </h3>
                <ul className="mt-6 space-y-5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="kafe-menu-item">
                        <span className="shrink-0">
                          <span className="font-medium text-[var(--kafe-fg)]">
                            {item.name}
                          </span>
                          {"note" in item && item.note && (
                            <span className="mt-0.5 block text-xs text-[var(--kafe-muted)]">
                              {item.note}
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-[var(--kafe-accent)]">
                          {item.price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </KafeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
