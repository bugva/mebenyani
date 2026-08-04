import { kafe } from "@/content/kafe";
import { KafeReveal } from "@/components/kafe/KafeReveal";

export function KafeHoursLocation() {
  return (
    <section className="bg-[var(--kafe-espresso)] px-6 py-24 text-[var(--kafe-cream)] md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <KafeReveal>
          <div id="saatler" className="scroll-mt-28">
            <p className="text-xs font-medium tracking-[0.25em] text-[var(--kafe-accent-soft)] uppercase">
              Saatler
            </p>
            <h2 className="kafe-display mt-4 text-4xl font-semibold md:text-5xl">
              Ne zaman açığız?
            </h2>
            <ul className="mt-10 space-y-0">
              {kafe.hours.map((row) => (
                <li
                  key={row.days}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-5 last:border-0"
                >
                  <span className="text-[var(--kafe-accent-soft)]">{row.days}</span>
                  <span className="font-mono text-lg font-medium">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </KafeReveal>

        <KafeReveal delay={0.1}>
          <div id="konum" className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-xs font-medium tracking-[0.25em] text-[var(--kafe-accent-soft)] uppercase">
              Konum
            </p>
            <h2 className="kafe-display mt-4 text-4xl font-semibold md:text-5xl">
              Bizi bul
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--kafe-accent-soft)]">
              {kafe.location.address}
            </p>
            <p className="mt-3 text-sm text-white/50">{kafe.location.note}</p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Demle Kahve konum"
                src={kafe.location.mapEmbedUrl}
                className="aspect-[16/9] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={kafe.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--kafe-cream)] py-3.5 text-sm font-medium text-[var(--kafe-espresso)] transition-opacity hover:opacity-90 sm:w-auto sm:px-8"
            >
              Haritada aç
              <span>↗</span>
            </a>
          </div>
        </KafeReveal>
      </div>
    </section>
  );
}
