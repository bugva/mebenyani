import { site } from "@/content/site";

export const ders = {
  brand: "bugva · özel ders",
  year: "2026",
  badge: "ODTÜ'lü iki arkadaştan",
  title: "Özel Ders",
  exams: ["TYT", "AYT"],
  band: ["TYT Matematik", "AYT Matematik", "TYT Fizik", "AYT Fizik"],
  subline:
    "Bu sınavlara biz de hazırlandık. Şimdi bildiklerimizi seninle paylaşıyoruz: birebir, online ya da yüz yüze.",
  tutors: [
    {
      no: "01",
      name: "Fatma Hilal Tekgöz",
      field: "Fizik",
      school: "ODTÜ Fizik",
      honor: "Yüksek Onur Öğrencisi",
      subjects: ["TYT Fizik", "AYT Fizik"],
      topics: ["Önce mantık, sonra formül", "Bol soru, az ezber", "Takıldığın yerde dururuz"],
      accent: "blue" as const,
    },
    {
      no: "02",
      name: "Buğra Aydoğan",
      field: "Matematik",
      school: "ODTÜ Matematik",
      honor: "Yüksek Onur Öğrencisi",
      subjects: ["TYT Matematik", "AYT Matematik"],
      topics: ["Temelden sağlam ilerleriz", "Anlamadan geçmeyiz", "Her hafta düzenli takip"],
      accent: "gold" as const,
    },
  ],
  features: [
    "Birebir",
    "Online ya da yüz yüze",
    "Deneme analizi",
    "Sorun cevapsız kalmaz",
    "İlk ders tanışma",
  ],
  cta: {
    heading: "Önce tanışalım.",
    subtext:
      "Hedefini, seviyeni ve uygun günlerini yaz; ilk ders tanışma dersimiz olsun. Gerisini birlikte planlarız.",
  },
  contact: {
    email: site.email,
    instagram: site.instagram,
  },
} as const;

export type DersConfig = typeof ders;
export type DersTutor = (typeof ders.tutors)[number];
