import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { getLensAlbumSlugs } from "@/lib/get-lens-gallery";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://emirbugraaydogan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries = posts.map((p) => ({
    url: `${baseUrl}/yazilar/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/yazilar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...postEntries,
    {
      url: `${baseUrl}/projeler/kahve`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projeler/fotograf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getLensAlbumSlugs().map((slug) => ({
      url: `${baseUrl}/projeler/fotograf/konser/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
