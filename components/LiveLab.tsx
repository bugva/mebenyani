import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AsciiImage } from "@/components/lab/AsciiImage";
import { GenerativeArt } from "@/components/lab/GenerativeArt";

export function LiveLab() {
  return (
    <section
      id="canli-deneyler"
      className="relative overflow-hidden border-y border-border bg-surface/20 px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_25%_25%,rgba(125,164,255,0.07),transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="08 — Canlı deneyler"
            title="Kodla dokunulan şeyler"
            subtitle="İkisi de bu sayfada gerçekten çalışıyor — üret, karıştır, indir. Kütüphane yok, sadece canvas."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.08}>
            <div className="glass rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                  ex-01 — generative
                </span>
                <span className="font-mono text-[10px] tracking-wider text-muted">
                  flow-field
                </span>
              </div>
              <GenerativeArt />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="glass rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                  ex-02 — ascii
                </span>
                <span className="font-mono text-[10px] tracking-wider text-muted">
                  realtime render
                </span>
              </div>
              <AsciiImage />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
