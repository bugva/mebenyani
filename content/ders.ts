import { site } from "@/content/site";

export const ders = {
  brand: "bugva · özel ders",
  badge: "ODTÜ · Yüksek Onur öğrencilerinden",
  hero: {
    title: "Özel Ders",
    subtitle: "Matematik × Fizik",
    exams: ["TYT", "AYT"],
    subline:
      "Birebir ders — online veya yüz yüze. Konu anlatımı, soru çözümü ve deneme analiziyle düzenli takip.",
  },
  tutors: [
    {
      no: "01",
      field: "Fizik",
      school: "ODTÜ Fizik",
      honor: "Yüksek Onur Öğrencisi",
      subjects: ["TYT Fizik", "AYT Fizik"],
      topics: ["Konu anlatımı", "Soru çözümü", "Deneme analizi"],
      accent: "blue" as const,
    },
    {
      no: "02",
      field: "Matematik",
      school: "ODTÜ Matematik",
      honor: "Yüksek Onur Öğrencisi",
      subjects: ["TYT Matematik", "AYT Matematik"],
      topics: ["Konu anlatımı", "Soru çözümü", "Deneme analizi"],
      accent: "gold" as const,
    },
  ],
  features: [
    "Birebir ders",
    "Online / yüz yüze",
    "Deneme analizi",
    "Soru çözüm desteği",
    "Düzenli takip",
  ],
  marquee: [
    "TYT Matematik",
    "AYT Matematik",
    "TYT Fizik",
    "AYT Fizik",
    "Özel Ders",
  ],
  cta: {
    heading: "Derse başla.",
    subtext:
      "Hedefini, seviyeni ve uygun günlerini yaz — birlikte plan yapalım.",
  },
  contact: {
    email: site.email,
    instagram: site.instagram,
  },
} as const;

export type DersConfig = typeof ders;
export type DersTutor = (typeof ders.tutors)[number];
