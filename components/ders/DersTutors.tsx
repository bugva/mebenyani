import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { ders } from "@/content/ders";

export function DersTutors() {
  return (
    <section id="egitmenler" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-24 md:px-6 md:py-32">
      <Reveal>
        <p className="text-center font-mono text-[11px] tracking-[0.35em] text-muted uppercase">
          Eğitmenler
        </p>
        <h2 className="mt-4 text-center font-display text-4xl font-bold tracking-tight md:text-6xl">
          Kimden ders <span className="text-gradient">alacaksın?</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {ders.tutors.map((tutor, i) => {
          const gold = tutor.accent === "gold";
          return (
            <Reveal key={tutor.no} delay={i * 0.12}>
              <article
                className={cn(
                  "glow-card card-shine relative h-full overflow-hidden p-7 md:p-9",
                  gold ? "ders-card-gold" : "ders-card-blue",
                )}
              >
                <span
                  className={cn(
                    "ghost-num pointer-events-none absolute -top-3 right-4 text-[7rem] md:text-[9rem]",
                    gold ? "opacity-80" : "opacity-100",
                  )}
                  aria-hidden
                >
                  {tutor.no}
                </span>

                <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
                  {tutor.school}
                </p>

                <h3
                  className={cn(
                    "mt-3 font-display text-4xl font-extrabold uppercase md:text-5xl",
                    gold ? "ders-gold-text" : "ders-blue-text",
                  )}
                >
                  {tutor.field}
                </h3>

                <p
                  className={cn(
                    "ders-ticket mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide",
                    gold ? "text-[#f2e3bb]" : "border-[#7da4ff]/45 bg-[#7da4ff]/8 text-[#cddcff]",
                  )}
                >
                  <span aria-hidden>★</span> {tutor.honor}
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {tutor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium",
                        gold ? "ders-chip-gold" : "ders-chip-blue",
                      )}
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
                  {tutor.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-3 text-sm text-muted">
                      <span className={gold ? "text-[#d4b46a]" : "text-accent"} aria-hidden>
                        ✓
                      </span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="glass mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl px-6 py-5">
          {ders.features.map((feature) => (
            <span key={feature} className="flex items-center gap-2.5 text-sm text-muted">
              <span className="text-accent" aria-hidden>◆</span>
              {feature}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
