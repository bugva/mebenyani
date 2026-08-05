import { BackToTop } from "@/components/BackToTop";
import { CommandPalette } from "@/components/CommandPalette";
import { JsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScroll } from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://emirbugraaydogan.vercel.app",
  ),
  title: "Emir Buğra Aydoğan",
  description:
    "Fotoğrafçı, video yapımcısı ve web geliştirici. Kişisel portföy ve tanıtım sitesi.",
  openGraph: {
    title: "Emir Buğra Aydoğan",
    description: "Fotoğraf · Video · Web",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <JsonLd />
        <div className="scanlines" aria-hidden />
        <div className="grain" aria-hidden />
        <SmoothScroll>
          <PageTransition />
          {children}
          <CommandPalette />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
