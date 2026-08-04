import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";

export function Process() {
  return (
    <section id="surec" className="scroll-mt-28 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="04 — Yaklaşım"
            title="Nasıl bakıyorum"
            subtitle="Ajans süreci değil — kendi işime nasıl yaklaştığım."
          />
        </Reveal>
        <div className="relative">
          <div
            className="absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-accent/50 via-[rgba(167,139,250,0.4)] to-accent/50 md:block"
            aria-hidden
          />
          <StaggerGroup className="grid gap-6 md:grid-cols-3">
            {site.process.map((step) => (
              <StaggerItem key={step.step}>
                <SpotlightCard tilt className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_40px_-20px_rgba(125,164,255,0.25)]">
                  <span
                    className="absolute -top-3 right-4 hidden h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background md:block"
                    aria-hidden
                  />
                  <span className="ghost-num text-6xl" aria-hidden>
                    {step.step}
                  </span>
                  <div className="mt-5 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-accent transition-colors duration-300 group-hover:border-accent/50">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <h3 className="font-display text-xl text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
