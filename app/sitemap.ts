import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { getLensAlbumSlugs } from "@/lib/get-lens-gallery";

export const dynamic = "force-static";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://emirbugraaydogan.vercel.app";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const url = (path: string) => `${baseUrl}${basePath}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = posts.map((p) => ({
    url: url(`/yazilar/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: url("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: url("/yazilar"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...postEntries,
    {
      url: url("/ozel-ders"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/projeler/kahve"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/projeler/fotograf"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getLensAlbumSlugs().map((slug) => ({
      url: url(`/projeler/fotograf/konser/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
