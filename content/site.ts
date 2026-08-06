import { asset } from "@/lib/asset";

export const site = {
  name: "Emir Buğra Aydoğan",
  tagline: "Fotoğraf · Video · Web",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "emirbugra@example.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? "",
  github: process.env.NEXT_PUBLIC_GITHUB ?? "",
  about: `Adım Emir Buğra Aydoğan. Fotoğraf çekmek benim için gözlem alıştırması — ışık, kadraj, bir anı durdurmak. Aynı merakla video çekimi, editing ve web siteleri de yapıyorum: az söz, net yapı, mobilde iyi görünen sayfalar. Bu site beni tanıman için; sorun veya iş birliği olursa aşağıdan yazabilirsin.`,
  interests: ["Sokak fotoğrafı", "Sahne ışığı", "Minimal arayüz"],
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
      description: "Ankara ve çevresinde portre, sokak, konser ve günlük an çekimleri.",
    },
    {
      title: "Video",
      description: "Sahne, etkinlik ve sosyal medya için çekim + kurgu.",
    },
    {
      title: "Web",
      description: "Next.js ile hızlı, mobil uyumlu landing ve portföy siteleri.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Bakmak",
      description:
        "Önce izlerim — ışık, mekân, tempo. Ne çekeceğime veya ne yazacağıma kendi merakım karar verir.",
    },
    {
      step: "02",
      title: "Denemek",
      description:
        "Kadrajı, kurguları, arayüzü yerinde kurarım. Az şey, net sonuç; kalabalık istemem.",
    },
    {
      step: "03",
      title: "Seçmek",
      description:
        "Çoğunu eleyip geride kalanı bırakırım. Kalan kare, klip veya sayfa benim için yeterliyse yeter.",
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
      title: "Web siteleri",
      description:
        "İşletmen veya kişisel markan için tek sayfa veya küçük çok sayfalı siteler.",
      href: "#hizmetler",
    },
    {
      title: "Fotoğraf çekimi",
      description:
        "Portre, etkinlik, konser ve ürün çekimleri — teslimat dijital arşiv veya web galeri.",
      href: "#fotograf",
    },
    {
      title: "Video çekimi",
      description:
        "Etkinlik, sahne ve sosyal medya için planlı video çekimi.",
      href: "/projeler/fotograf#galeri",
    },
    {
      title: "Editing / post-prodüksiyon",
      description:
        "Kurgu, renk düzenleme ve temel ses düzenleme ile teslimata hazır içerik.",
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
    heading: "Merhaba de",
    subtext: "Bir şey sormak veya birlikte bir şey denemek istersen e-posta ya da Instagram yeterli.",
  },
  footer: {
    socialLabel: "Instagram",
  },
} as const;

export type SiteConfig = typeof site;
export type PortfolioItem = (typeof site.portfolio)[number];
