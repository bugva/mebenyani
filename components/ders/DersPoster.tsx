import { cn } from "@/lib/cn";
import { ders } from "@/content/ders";
import type { CSSProperties } from "react";

const symbols = [
  { char: "π", className: "left-[4%] top-[3%] text-[8cqw] text-accent/12", tilt: "-10deg", delay: "0s" },
  { char: "∑", className: "right-[5%] top-[6%] text-[7cqw] text-[#d4b46a]/12", tilt: "8deg", delay: "1.2s" },
  { char: "Δ", className: "left-[3%] bottom-[8%] text-[7cqw] text-[#d4b46a]/10", tilt: "6deg", delay: "0.6s" },
  { char: "√", className: "right-[4%] bottom-[5%] text-[8cqw] text-accent/10", tilt: "-6deg", delay: "1.8s" },
];

export function DersPoster() {
  const { instagram, email } = ders.contact;

  return (
    <div className="a4-stage">
      <div className="a4-sheet ders-mesh relative overflow-hidden">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="ders-ring left-1/2 top-[30%] h-[120cqw] w-[120cqw] -translate-x-1/2 -translate-y-1/2" aria-hidden />
        <div className="ders-ring left-1/2 top-[30%] h-[86cqw] w-[86cqw] -translate-x-1/2 -translate-y-1/2" aria-hidden />

        {symbols.map((s) => (
          <span
            key={s.char}
            className={`ders-symbol ${s.className}`}
            style={{ "--tilt": s.tilt, animationDelay: s.delay } as CSSProperties}
            aria-hidden
          >
            {s.char}
          </span>
        ))}

        <div className="relative z-10 flex h-full flex-col px-[7cqw] py-[6cqw]">
          <div className="flex items-center justify-between font-mono text-[2.1cqw] tracking-[0.3em] text-muted uppercase">
            <span>{ders.brand}</span>
            <span>{ders.year}</span>
          </div>

          <div className="mt-[4cqw] text-center">
            <p className="inline-flex items-center gap-[1.5cqw] rounded-full border border-border bg-surface/60 px-[4cqw] py-[1.4cqw] font-mono text-[2cqw] tracking-[0.22em] text-muted uppercase">
              <span className="text-accent" aria-hidden>◆</span>
              {ders.badge}
              <span className="text-[#d4b46a]" aria-hidden>◆</span>
            </p>

            <h1 className="text-shimmer mt-[2.5cqw] font-display text-[13cqw] leading-[0.9] font-extrabold tracking-[-0.02em] uppercase">
              {ders.title}
            </h1>

            <p className="mt-[1.5cqw] flex items-baseline justify-center gap-[2.5cqw] font-display text-[5cqw] leading-none font-bold uppercase">
              <span className="ders-gold-text">Matematik</span>
              <span className="text-muted/70" aria-hidden>×</span>
              <span className="ders-blue-text">Fizik</span>
            </p>

            <div className="mt-[3cqw] flex items-center justify-center gap-[2cqw]">
              {ders.exams.map((exam) => (
                <span
                  key={exam}
                  className="gradient-border rounded-full px-[4cqw] py-[1.3cqw] font-mono text-[2.4cqw] font-semibold tracking-[0.3em] text-foreground"
                >
                  {exam}
                </span>
              ))}
            </div>

            <p className="mx-auto mt-[2.6cqw] max-w-[70cqw] text-[2.3cqw] leading-relaxed text-muted">
              {ders.subline}
            </p>
          </div>

          <div className="mt-[3cqw] flex items-center justify-center gap-[2cqw] border-y border-border py-[1.7cqw] font-mono text-[2.05cqw] tracking-[0.18em] text-muted uppercase">
            {ders.band.map((item, i) => (
              <span key={item} className="flex items-center gap-[2cqw]">
                {i > 0 && <span className={i % 2 === 0 ? "text-accent" : "text-[#d4b46a]"} aria-hidden>◆</span>}
                <span>{item}</span>
              </span>
            ))}
          </div>

          <div className="mt-[3cqw] grid grid-cols-2 gap-[3cqw]">
            {ders.tutors.map((tutor) => {
              const gold = tutor.accent === "gold";
              return (
                <article
                  key={tutor.no}
                  className={cn(
                    "glow-card relative overflow-hidden rounded-[2cqw] p-[4cqw]",
                    gold ? "ders-card-gold" : "ders-card-blue",
                  )}
                >
                  <span
                    className="ghost-num pointer-events-none absolute -top-[2.5cqw] right-[2cqw] text-[13cqw]"
                    aria-hidden
                  >
                    {tutor.no}
                  </span>

                  <p className="font-mono text-[1.9cqw] tracking-[0.28em] text-muted uppercase">
                    {tutor.school}
                  </p>

                  <h2
                    className={cn(
                      "mt-[1cqw] font-display text-[4.4cqw] leading-none font-extrabold uppercase",
                      gold ? "ders-gold-text" : "ders-blue-text",
                    )}
                  >
                    {tutor.field}
                  </h2>

                  <p className="mt-[1.4cqw] font-display text-[2.9cqw] font-semibold text-foreground">
                    {tutor.name}
                  </p>

                  <p
                    className={cn(
                      "ders-ticket mt-[1.6cqw] inline-flex items-center gap-[1cqw] rounded-full px-[2.4cqw] py-[1cqw] text-[1.9cqw] font-semibold tracking-wide",
                      gold ? "text-[#f2e3bb]" : "border-[#7da4ff]/45 bg-[#7da4ff]/8 text-[#cddcff]",
                    )}
                  >
                    <span aria-hidden>★</span> {tutor.honor}
                  </p>

                  <div className="mt-[2.2cqw] flex flex-wrap gap-[1.2cqw]">
                    {tutor.subjects.map((subject) => (
                      <span
                        key={subject}
                        className={cn(
                          "rounded-full px-[2.2cqw] py-[0.9cqw] text-[2.05cqw] font-medium",
                          gold ? "ders-chip-gold" : "ders-chip-blue",
                        )}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-[2.2cqw] space-y-[1cqw] border-t border-border pt-[2cqw]">
                    {tutor.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-[1.2cqw] text-[2cqw] text-muted">
                        <span className={gold ? "text-[#d4b46a]" : "text-accent"} aria-hidden>
                          ✓
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-[2.6cqw] flex flex-wrap items-center justify-center gap-x-[3cqw] gap-y-[1.2cqw]">
            {ders.features.map((feature) => (
              <span key={feature} className="flex items-center gap-[1.2cqw] text-[2.05cqw] text-muted">
                <span className="text-accent" aria-hidden>◆</span>
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-[3cqw] text-center">
            <h2 className="font-display text-[5.2cqw] font-extrabold tracking-tight">
              {ders.cta.heading.split(" ")[0]}{" "}
              <span className="text-shimmer">
                {ders.cta.heading.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="mx-auto mt-[1.4cqw] max-w-[62cqw] text-[2.15cqw] leading-relaxed text-muted">
              {ders.cta.subtext}
            </p>
            <div className="mt-[2.6cqw] flex items-center justify-center gap-[2cqw]">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-border rounded-full px-[4.5cqw] py-[1.6cqw] text-[2.2cqw] font-semibold tracking-wide text-foreground"
                >
                  Instagram&apos;dan yaz ↗
                </a>
              )}
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Özel ders — TYT/AYT")}`}
                className="rounded-full border border-border px-[4.5cqw] py-[1.6cqw] text-[2.2cqw] font-medium text-muted"
              >
                Mail at
              </a>
            </div>
          </div>

          <footer className="mt-[3cqw] flex items-center justify-between border-t border-border pt-[2.4cqw] font-mono text-[1.9cqw] tracking-wider text-muted/80">
            <span>© {ders.year} bugva · özel ders</span>
            <span className="lowercase">{email}</span>
            <span className="uppercase">TYT · AYT</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
