import { site } from "@/content/site";

const tags = site.tagline.split("·").map((t) => t.trim());

export function Marquee() {
  const items = [...tags, ...tags, ...tags, ...tags];

  return (
    <div className="group relative overflow-hidden border-y border-border bg-surface/30 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent md:w-32" />
      <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
        {items.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="shrink-0 font-display text-sm font-medium tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent md:text-base"
          >
            {tag}
            <span className="mx-6 text-accent/80">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
