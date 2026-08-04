import { notFound } from "next/navigation";
import { FotoAlbumNav } from "@/components/foto/FotoAlbumNav";
import { FotoConcertGallery } from "@/components/foto/FotoConcertGallery";
import { FotoFooter } from "@/components/foto/FotoFooter";
import { FotoKonserHero } from "@/components/foto/FotoKonserHero";
import { FotoNav } from "@/components/foto/FotoNav";
import { FotoReveal } from "@/components/foto/FotoReveal";
import { foto } from "@/content/foto";
import {
  getAdjacentAlbums,
  getLensAlbum,
  getLensAlbumSlugs,
} from "@/lib/get-lens-gallery";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLensAlbumSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const album = getLensAlbum(slug);
  if (!album) return { title: "Konser bulunamadı" };
  return {
    title: `${album.title} — ${foto.brand}`,
    description: album.venue
      ? `${album.title} · ${album.venue} — konser fotoğrafları`
      : `${album.title} — konser fotoğrafları`,
  };
}

export default async function KonserAlbumPage({ params }: PageProps) {
  const { slug } = await params;
  const album = getLensAlbum(slug);
  if (!album) notFound();

  const { prev, next } = getAdjacentAlbums(slug);

  return (
    <>
      <FotoNav
        backHref="/projeler/fotograf#galeri"
        backLabel="← Tüm konserler"
      />

      <main>
        <FotoKonserHero album={album} />

        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl">
            <FotoReveal>
              <div className="foto-rule mt-12" />
              <p className="foto-label mt-8">Galeri</p>
              <p className="foto-mono mt-2 text-[var(--foto-muted)]">
                Büyütmek için tıkla
              </p>
            </FotoReveal>
            <FotoConcertGallery album={album} />
            <FotoAlbumNav prev={prev} next={next} />
          </div>
        </section>
      </main>

      <FotoFooter />
    </>
  );
}
