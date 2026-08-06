"use client";

import { site } from "@/content/site";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";

export function Focus() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" title="Odak" subtitle="Üç alan. Aynı standart." />
        <StaggerGroup className="grid gap-0 border-t border-border md:grid-cols-3">
          {site.focus.map((item, i) => (
            <StaggerItem key={item.title}>
              <article className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
