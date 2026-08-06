import { Reveal } from "@/components/Reveal";
import { DersScrollButton } from "@/components/ders/DersScrollButton";
import { ders } from "@/content/ders";
import type { CSSProperties } from "react";

const symbols = [
  { char: "π", className: "left-[6%] top-[16%] text-6xl md:text-8xl text-accent/15", tilt: "-10deg", delay: "0s" },
  { char: "∑", className: "right-[9%] top-[22%] text-5xl md:text-7xl text-[#d4b46a]/15", tilt: "8deg", delay: "1.2s" },
  { char: "Δ", className: "left-[14%] bottom-[18%] text-5xl md:text-7xl text-[#d4b46a]/12", tilt: "6deg", delay: "0.6s" },
  { char: "√", className: "right-[14%] bottom-[24%] text-6xl md:text-8xl text-accent/12", tilt: "-6deg", delay: "1.8s" },
  { char: "θ", className: "left-[28%] top-[10%] hidden text-5xl text-accent-2/15 md:block", tilt: "12deg", delay: "2.4s" },
  { char: "∞", className: "right-[26%] top-[12%] hidden text-6xl text-[#d4b46a]/12 md:block", tilt: "-12deg", delay: "3s" },
];

export function DersHero() {
  const cta = ders.contact.instagram
    ? { href: ders.contact.instagram, external: true, label: "Instagram'dan yaz ↗" }
    : { href: `mailto:${ders.contact.email}`, external: false, label: "Ders için yaz →" };

  return (
    <section className="ders-mesh relative flex min-h-svh items-center justify-center overflow-hidden">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="ders-ring left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2" aria-hidden />
      <div className="ders-ring left-1/2 top-1/2 h-[92vmin] w-[92vmin] -translate-x-1/2 -translate-y-1/2" aria-hidden />

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

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-32 text-center md:px-6">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-5 py-2.5 font-mono text-[11px] tracking-[0.25em] text-muted uppercase backdrop-blur-sm md:text-xs">
            <span className="text-accent" aria-hidden>◆</span>
            {ders.badge}
            <span className="text-[#d4b46a]" aria-hidden>◆</span>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-shimmer mt-8 font-display text-[clamp(3.6rem,15vw,11.5rem)] leading-[0.9] font-extrabold tracking-[-0.02em] uppercase">
            {ders.hero.title}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1 font-display text-[clamp(1.9rem,6.5vw,4.6rem)] leading-none font-bold uppercase">
            <span className="ders-gold-text">Matematik</span>
            <span className="text-muted/70" aria-hidden>×</span>
            <span className="ders-blue-text">Fizik</span>
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex items-center justify-center gap-3">
            {ders.hero.exams.map((exam) => (
              <span
                key={exam}
                className="gradient-border rounded-full px-6 py-2.5 font-mono text-sm font-semibold tracking-[0.3em] text-foreground"
              >
                {exam}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {ders.hero.subline}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={cta.href}
              {...(cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="gradient-border btn-shimmer rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-foreground transition-shadow hover:shadow-[0_0_32px_-6px_rgba(125,164,255,0.5)]"
            >
              {cta.label}
            </a>
            <DersScrollButton
              targetId="egitmenler"
              className="rounded-full border border-border px-8 py-4 text-sm font-medium text-muted transition-colors hover:border-accent/45 hover:text-foreground"
            >
              Eğitmenler ↓
            </DersScrollButton>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2" aria-hidden>
        <div className="flex flex-col items-center gap-2 text-muted/70">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase">Kaydır</span>
          <span className="animate-bounce text-sm">↓</span>
        </div>
      </div>
    </section>
  );
}
