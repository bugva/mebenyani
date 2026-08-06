import { cn } from "@/lib/cn";
import { ders } from "@/content/ders";

export function DersMarquee() {
  const items = [...ders.marquee, ...ders.marquee, ...ders.marquee, ...ders.marquee];

  return (
    <div className="group relative overflow-hidden border-y border-border bg-surface/30 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050507] to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050507] to-transparent md:w-32" />
      <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-10">
            <span
              className={cn(
                "font-display text-xl font-bold tracking-[0.12em] uppercase md:text-2xl",
                i % 2 === 0 ? "text-foreground" : "text-stroke",
              )}
            >
              {item}
            </span>
            <span
              className={cn("text-sm", i % 2 === 0 ? "text-accent" : "text-[#d4b46a]")}
              aria-hidden
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
