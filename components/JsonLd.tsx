import { site } from "@/content/site";

export function JsonLd() {
  const sameAs = [site.instagram, site.linkedin, site.github].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: site.about.slice(0, 200),
    jobTitle: "Fotoğrafçı, Video Yapımcısı, Web Geliştirici",
    knowsAbout: ["Fotoğrafçılık", "Video Prodüksiyon", "Web Geliştirme"],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
