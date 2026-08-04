import { FotoConcertGrid } from "@/components/foto/FotoConcertGrid";
import { FotoFooter } from "@/components/foto/FotoFooter";
import { FotoHero } from "@/components/foto/FotoHero";
import { FotoNav } from "@/components/foto/FotoNav";
import { FotoReveal } from "@/components/foto/FotoReveal";
import { FotoSectionHead } from "@/components/foto/FotoSectionHead";
import { foto } from "@/content/foto";
import { getLensAlbums } from "@/lib/get-lens-gallery";

export default function FotografDemoPage() {
  const albums = getLensAlbums();
  const latest = albums[0];

  return (
    <>
      <FotoNav />

      <main>
        <FotoHero latest={latest} />

        <section
          id="galeri"
          className="scroll-mt-28 border-t border-[var(--foto-border)] px-6 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <FotoSectionHead
              label="Arşiv"
              title="Konserler"
              subtitle="Her albüm bir gece — kapaktan içeri gir, o konserdeki tüm karelere ulaş."
            />
            <FotoConcertGrid albums={albums} />
          </div>
        </section>

        <section id="hizmetler" className="scroll-mt-28 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FotoSectionHead
              label="Hizmet"
              title="Sahne & festival"
              subtitle="Konser, festival ve sanatçı portföyü — teslimat dijital arşiv."
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {foto.services.map((s, i) => (
                <FotoReveal key={s.title} delay={i * 0.08}>
                  <article className="foto-service-card h-full">
                    <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--foto-accent)] uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="foto-display mt-4 text-2xl text-[var(--foto-fg)]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--foto-muted)]">
                      {s.description}
                    </p>
                    <p className="mt-6 text-sm text-[var(--foto-accent)]">{s.price}</p>
                  </article>
                </FotoReveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="iletisim"
          className="scroll-mt-28 border-t border-[var(--foto-border)] px-6 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <FotoSectionHead
              label="İletişim"
              title="Bir sonraki sahne"
              subtitle="Konser, festival veya basın işleri için yaz."
            />
            <FotoReveal delay={0.1}>
              <a
                href={`mailto:${foto.email}`}
                className="foto-display mt-6 inline-block text-5xl text-[var(--foto-fg)] transition-colors hover:text-[var(--foto-accent)] md:text-7xl"
              >
                {foto.email}
              </a>
              {foto.instagram && (
                <a
                  href={foto.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foto-mono mt-6 inline-block text-[var(--foto-muted)] transition-colors hover:text-[var(--foto-accent-2)]"
                >
                  Instagram ↗
                </a>
              )}
            </FotoReveal>
          </div>
        </section>
      </main>

      <FotoFooter />
    </>
  );
}
