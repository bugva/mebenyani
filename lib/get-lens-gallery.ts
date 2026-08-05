import "server-only";
import fs from "fs";
import path from "path";
import { asset } from "@/lib/asset";
import galleryManifest from "@/content/foto-gallery.json";
import type { LensAlbum, LensPhoto } from "@/lib/lens-gallery-types";

const LENS_DIR = path.join(process.cwd(), "public", "projeler", "lens");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
const COVER_FILE = /^cover\./i;
const PUBLIC_PREFIX = asset("/projeler/lens");

type ManifestAlbum = {
  slug: string;
  title?: string;
  venue?: string;
  date?: string;
  cover?: string;
  order?: number;
};

function humanizeSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function listImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => !f.startsWith(".") && IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function toPhoto(slug: string, file: string, alt: string): LensPhoto {
  return {
    file,
    src: `${PUBLIC_PREFIX}/${slug}/${file}`,
    alt,
  };
}

function buildAlbumFromFolder(
  slug: string,
  meta?: ManifestAlbum,
): LensAlbum | null {
  const dir = path.join(LENS_DIR, slug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return null;

  const files = listImageFiles(dir);
  if (files.length === 0) return null;

  const title = meta?.title ?? humanizeSlug(slug);
  let coverFile = meta?.cover;

  if (coverFile && !files.includes(coverFile)) coverFile = undefined;
  if (!coverFile) {
    coverFile = files.find((f) => COVER_FILE.test(f));
  }
  if (!coverFile) coverFile = files[0];

  const galleryFiles = files.filter((f) => f !== coverFile);
  const allPhotos =
    galleryFiles.length > 0 ? galleryFiles : files.filter((f) => f === coverFile);

  const photos = allPhotos.map((file) =>
    toPhoto(slug, file, `${title} — ${file}`),
  );
  const cover = toPhoto(slug, coverFile, `${title} — kapak`);

  return {
    slug,
    title,
    venue: meta?.venue,
    date: meta?.date,
    cover,
    photos,
    photoCount: photos.length,
  };
}

function listAlbumSlugsOnDisk(): string[] {
  if (!fs.existsSync(LENS_DIR)) return [];
  return fs
    .readdirSync(LENS_DIR)
    .filter((name) => {
      if (name.startsWith(".")) return false;
      const full = path.join(LENS_DIR, name);
      return fs.statSync(full).isDirectory();
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function getLensAlbums(): LensAlbum[] {
  const manifestAlbums = (galleryManifest.albums ?? []) as ManifestAlbum[];
  const manifestBySlug = new Map(manifestAlbums.map((a) => [a.slug, a]));
  const usedSlugs = new Set<string>();
  const albums: LensAlbum[] = [];

  const sortedManifest = [...manifestAlbums].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  );

  for (const entry of sortedManifest) {
    const album = buildAlbumFromFolder(entry.slug, entry);
    if (!album) continue;
    usedSlugs.add(entry.slug);
    albums.push(album);
  }

  for (const slug of listAlbumSlugsOnDisk()) {
    if (usedSlugs.has(slug)) continue;
    const album = buildAlbumFromFolder(slug);
    if (album) albums.push(album);
  }

  return albums;
}

export function getLensAlbumSlugs(): string[] {
  return getLensAlbums().map((a) => a.slug);
}

export function getLensAlbum(slug: string): LensAlbum | null {
  const manifest = (galleryManifest.albums ?? []) as ManifestAlbum[];
  const meta = manifest.find((a) => a.slug === slug);
  return buildAlbumFromFolder(slug, meta);
}

/**
 * Returns the album immediately before and after `slug` in the same order
 * shown on /projeler/fotograf, wrapping around at the ends so visitors can
 * browse the whole archive continuously. When there is only one album (or
 * the slug isn't found), both are null.
 */
export function getAdjacentAlbums(slug: string): {
  prev: LensAlbum | null;
  next: LensAlbum | null;
} {
  const albums = getLensAlbums();
  const index = albums.findIndex((a) => a.slug === slug);

  if (index === -1 || albums.length < 2) {
    return { prev: null, next: null };
  }

  const prevIndex = (index - 1 + albums.length) % albums.length;
  const nextIndex = (index + 1) % albums.length;

  return { prev: albums[prevIndex], next: albums[nextIndex] };
}
