"use client";

import type { PortfolioItem } from "@/content/site";
import { cn } from "@/lib/cn";
import { useState } from "react";
import { Magnetic } from "@/components/Magnetic";
import { RGBSplitImage } from "@/components/RGBSplitImage";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [expanded, setExpanded] = useState(false);
  const stack = (() => {
    const maybe = (item as { stack?: unknown }).stack;
    return Array.isArray(maybe) ? maybe : [];
  })();
  const hasStack = stack.length > 0;

  return (
    <article
      id={item.slug}
      className="card-shine scroll-mt-28 rounded-2xl border border-border bg-surface transition-colors hover:border-accent/30 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
            {item.tag}
          </span>
          <span className="text-xs text-muted">·</span>
          <span className="font-mono text-xs text-muted">{item.year}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl text-foreground md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-2 max-w-2xl text-muted">{item.description}</p>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-accent underline-offset-2 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Daha az" : "Daha fazla"}
        </button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-6 pb-8 pt-6 md:px-8">
            {item.image && (
              <div className="group/img relative mb-6 aspect-video overflow-hidden rounded-xl border border-border">
                <RGBSplitImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}
            <p className="text-sm leading-relaxed text-muted md:text-base">
              {item.details}
            </p>
            <ul className="mt-6 space-y-2">
              {item.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="text-accent">—</span>
                  {h}
                </li>
              ))}
            </ul>
            {hasStack && (
              <div className="mt-6 flex flex-wrap gap-2">
                {stack!.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {item.href && (
              <Magnetic strength={0.5} range={80} className="mt-8 inline-block">
                <a
                  href={item.href}
                  target={item.href.startsWith("/") ? undefined : "_blank"}
                  rel={
                    item.href.startsWith("/")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {item.href.startsWith("/") ? "Canlı demoyu aç" : "Görüntüle"}
                  <span>↗</span>
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
