import { site } from "@/content/site";

export const ders = {
  brand: "bugva · özel ders",
  year: "2026",
  badge: "ODTÜ · Yüksek Onur öğrencilerinden",
  title: "Özel Ders",
  exams: ["TYT", "AYT"],
  band: ["TYT Matematik", "AYT Matematik", "TYT Fizik", "AYT Fizik"],
  tutors: [
    {
      no: "01",
      name: "Fatma Hilal Tekgöz",
      field: "Fizik",
      school: "ODTÜ Fizik",
      honor: "Yüksek Onur Öğrencisi",
      subjects: ["TYT Fizik", "AYT Fizik"],
      topics: ["Konu anlatımı", "Soru çözümü", "Deneme analizi"],
      accent: "blue" as const,
    },
    {
      no: "02",
      name: "Buğra Aydoğan",
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
