import type { NextConfig } from "next";

const ghPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = ghPages
  ? {
      // GitHub Pages derlemesi: statik export, proje sayfası alt yolu.
      // Route handler'lar (app/api) statik olamadığı için workflow bu adımda onları ayırır.
      output: "export",
      basePath: "/mebenyani",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      async headers() {
        return [
          {
            source: "/embed/:path*",
            headers: [
              {
                key: "Content-Security-Policy",
                value: "frame-ancestors *",
              },
            ],
          },
        ];
      },
    };

export default nextConfig;
