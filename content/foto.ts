import { site } from "@/content/site";

export const foto = {
  brand: "Lens",
  tagline: "Konser fotoğrafçılığı",
  description:
    "Canlı müzik ve sahne ışığı — her konser bir albüm. Kapak görseline tıkla, o gecenin tüm karelerine geç.",
  email: site.email,
  instagram: site.instagram,
  nav: [
    { label: "Konserler", href: "#galeri" },
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "İletişim", href: "#iletisim" },
  ],
  services: [
    {
      title: "Konser / festival",
      description: "Sahne önü ve pit çekimleri; teslimat dijital arşiv.",
      price: "Teklif üzerine",
    },
    {
      title: "Sanatçı portföyü",
      description: "Tek gece veya tur boyunca görsel arşiv.",
      price: "Proje bazlı",
    },
    {
      title: "Basın / medya",
      description: "Editoryal kullanım için lisanslı dosya teslimi.",
      price: "Görüşülür",
    },
  ],
  credit: {
    author: site.name,
    authorUrl: "/",
    note: `${site.name} — konser fotoğrafçılığı.`,
  },
} as const;
