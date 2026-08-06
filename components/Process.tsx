import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";

export function Process() {
  return (
    <section id="surec" className="scroll-mt-28 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading index="04" title="Yöntem" subtitle="Ajans dili yok. Sadece iş." />
        </Reveal>
        <StaggerGroup className="grid gap-0 border-t border-border md:grid-cols-3">
          {site.process.map((step) => (
            <StaggerItem key={step.step}>
              <article className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted">
                  {step.step}
                </p>
                <h3 className="mt-4 font-display text-2xl text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
