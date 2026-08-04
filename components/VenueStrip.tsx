import { site } from "@/content/site";

type Venue = { readonly name: string; readonly kind: string };

export function VenueStrip() {
  const venues: readonly Venue[] = site.venues;
  if (venues.length === 0) return null;

  const items: Venue[] = [...venues, ...venues, ...venues];

  return (
    <div className="mt-16 border-t border-border pt-10">
      <p className="text-center font-mono text-[10px] tracking-widest text-muted uppercase">
        Birlikte çalıştığım mekanlar &amp; sanatçılar
        <span className="ml-2 text-muted/50">— örnek/portföy amaçlı</span>
      </p>
      <div className="group relative mt-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface/30 to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface/30 to-transparent md:w-28" />
        <div className="flex w-max animate-marquee-slow gap-8 group-hover:[animation-play-state:paused]">
          {items.map((venue, i) => (
            <span
              key={`${venue.name}-${i}`}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-muted transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[9px] tracking-widest text-accent/70 uppercase">
                {venue.kind}
              </span>
              {venue.name}
              <span className="ml-6 text-accent/50">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
