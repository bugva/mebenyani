import type { Metadata } from "next";
import "./ders.css";

export const metadata: Metadata = {
  title: "Özel Ders — TYT/AYT Matematik & Fizik",
  description:
    "ODTÜ Fizik ve ODTÜ Matematik yüksek onur öğrencilerinden TYT/AYT matematik ve fizik özel ders. Birebir, online veya yüz yüze.",
  openGraph: {
    title: "Özel Ders — TYT/AYT Matematik & Fizik",
    description: "ODTÜ yüksek onur öğrencilerinden birebir özel ders.",
    type: "website",
  },
};

export default function DersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-lenis-prevent
      className="ders-root fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto"
    >
      {children}
    </div>
  );
}
