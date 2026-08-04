import { Barlow, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./foto.css";

const barlow = Barlow({
  variable: "--font-foto-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bebas = Bebas_Neue({
  variable: "--font-foto-display",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-foto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lens — Konser fotoğrafçılığı",
  description:
    "Canlı müzik ve sahne ışığı. Her konser bir albüm — konser fotoğraf portföyü.",
};

export default function FotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`foto-root fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto ${barlow.variable} ${bebas.variable} ${plexMono.variable}`}
    >
      {children}
    </div>
  );
}
