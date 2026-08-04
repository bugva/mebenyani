export type LensPhoto = {
  file: string;
  src: string;
  alt: string;
};

export type LensAlbum = {
  slug: string;
  title: string;
  venue?: string;
  date?: string;
  cover: LensPhoto;
  photos: LensPhoto[];
  photoCount: number;
};

export const lensUploadHint = {
  folder: "public/projeler/lens/{konser-klasoru}/",
  manifest: "content/foto-gallery.json",
  coverFile: "cover.jpg (veya cover.webp)",
  formats: "JPG, PNG, WebP",
};
