import { asset } from "@/lib/asset";

export const site = {
  name: "Emir Buğra Aydoğan",
  tagline: "Fotoğraf · Video · Web",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "emirbugra@example.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  github: process.env.NEXT_PUBLIC_GITHUB ?? "",
  about: `Fotoğraf. Video. Web. Aynı el, aynı standart. Kalabalık istemem — kalan şey yeterse yeter.`,
  interests: ["Işık", "Kadraj", "Kod"],
  nav: [
    { label: "Hakkımda", href: "#hakkimda", sectionId: "hakkimda" },
    { label: "Fotoğraf", href: "#fotograf", sectionId: "fotograf" },
    { label: "Neler", href: "#hizmetler", sectionId: "hizmetler" },
    { label: "Özel Ders", href: "/ozel-ders", sectionId: "ozel-ders" },
    { label: "İletişim", href: "#iletisim", sectionId: "iletisim" },
  ],
  timeline: [
    {
      year: "2022 —",
      title: "Fotoğraf",
      description: "Portre ve sokak çekimleri; ışık ve kompozisyon odaklı.",
    },
    {
      year: "2024 —",
      title: "Video & editing",
      description: "Etkinlik çekimi, aftermovie ve post-prodüksiyon.",
    },
    {
      year: "2024 —",
      title: "Web",
      description: "Küçük işletme ve kişisel portföy siteleri.",
    },
  ],
  focus: [
    {
      title: "Fotoğraf",
      description: "Portre, sokak, sahne. Işık doğruysa yeter.",
    },
    {
      title: "Video",
      description: "Çekim ve kurgu. Tempo net, süs yok.",
    },
    {
      title: "Web",
      description: "Hızlı, mobil, gereksiz özellik yok.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Bakmak",
      description: "Önce izlerim. Karar sonra gelir.",
    },
    {
      step: "02",
      title: "Kurmak",
      description: "Az eleman. Net sonuç.",
    },
    {
      step: "03",
      title: "Kesmek",
      description: "Gereksiz olanı çıkarırım.",
    },
  ],
  skills: {
    fotograf: [
      "Lightroom",
      "Kompozisyon",
      "Portre",
      "Sokak",
      "Doğal ışık",
    ],
    video: [
      "Çekim",
      "Kurgu",
      "Renk düzeltme",
      "Aftermovie",
      "Reels / Shorts",
    ],
    web: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Vercel",
      "Responsive tasarım",
    ],
  },
  services: [
    {
      title: "Web",
      description: "Tek sayfa veya küçük site. Net yapı.",
      href: "#hizmetler",
    },
    {
      title: "Fotoğraf",
      description: "Portre, etkinlik, sahne. Seçilmiş kareler.",
      href: "#fotograf",
    },
    {
      title: "Video",
      description: "Çekim. Kurgu. Teslim.",
      href: "/projeler/fotograf#galeri",
    },
    {
      title: "Post",
      description: "Renk, tempo, bitmiş dosya.",
      href: "/projeler/fotograf#galeri",
    },
  ],
  gallery: [
    {
      src: asset("/gallery/01.svg"),
      alt: "Gece şehir ışıkları",
      caption: "Gece",
      location: "Ankara",
    },
    {
      src: asset("/gallery/02.svg"),
      alt: "Portre çalışması",
      caption: "Portre",
      location: "Stüdyo",
    },
    {
      src: asset("/gallery/03.svg"),
      alt: "Doğa manzarası",
      caption: "Doğa",
      location: "Çevre yürüyüşü",
    },
    {
      src: asset("/gallery/04.svg"),
      alt: "Mimari detay",
      caption: "Mimari",
      location: "Kampüs",
    },
    {
      src: asset("/gallery/05.svg"),
      alt: "Sokak sahnesi",
      caption: "Sokak",
      location: "Merkez",
    },
    {
      src: asset("/gallery/06.svg"),
      alt: "Detay kompozisyon",
      caption: "Detay",
    },
    {
      src: asset("/gallery/07.svg"),
      alt: "Manzara",
      caption: "Manzara",
    },
    {
      src: asset("/gallery/08.svg"),
      alt: "İç mekân",
      caption: "İç mekân",
    },
    {
      src: asset("/gallery/09.svg"),
      alt: "Günlük an",
      caption: "An",
    },
  ],
  portfolio: [
    {
      slug: "foto-seri-ankara",
      title: "Ankara sokak serisi",
      tag: "Fotoğraf" as const,
      year: "2024",
      description: "Şehir ışığı ve insan — kişisel fotoğraf serisi.",
      details:
        "Altı aylık kişisel proje: akşam ışığı, sokak portreleri ve mimari detaylar. Seri Instagram'da paylaşıldı; baskıya hazır dosyalar ayrıca arşivlendi.",
      highlights: [
        "40+ seçilmiş kare",
        "Doğal ışık odaklı",
        "Siyah-beyaz ve renk karışımı",
      ],
      image: asset("/portfolio/02.svg"),
      href: "#fotograf",
    },
  ],
  contact: {
    heading: "Yaz.",
    subtext: "Kısa tut. Ne istediğini söyle.",
  },
  footer: {
    socialLabel: "Instagram",
  },
} as const;

export type SiteConfig = typeof site;
export type PortfolioItem = (typeof site.portfolio)[number];
