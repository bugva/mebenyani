import { kafe } from "@/content/kafe";
import { KafeReveal } from "@/components/kafe/KafeReveal";

export function KafeFeatures() {
  return (
    <section className="border-y border-[var(--kafe-border)] bg-[var(--kafe-cream)] px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {kafe.features.map((feature, i) => (
          <KafeReveal key={feature.title} delay={i * 0.08}>
            <article className="text-center md:text-left">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--kafe-accent-soft)] font-mono text-sm text-[var(--kafe-accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="kafe-display mt-4 text-2xl text-[var(--kafe-espresso)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--kafe-muted)]">
                {feature.description}
              </p>
            </article>
          </KafeReveal>
        ))}
      </div>
    </section>
  );
}
