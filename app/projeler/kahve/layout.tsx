import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./kafe.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Demle Kahve — Ankara",
  description:
    "Sıcak fincan, sakin köşe. Demle Kahve menü, çalışma saatleri ve konum.",
  openGraph: {
    title: "Demle Kahve",
    description: "Ankara'da özenle demlenen kahve.",
    type: "website",
  },
};

export default function KafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`kafe-root fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto ${dmSans.variable} ${cormorant.variable}`}
    >
      <div className="kafe-grain" aria-hidden />
      {children}
    </div>
  );
}
