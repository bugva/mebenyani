import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Emir Buğra Aydoğan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#070708",
          color: "#f2f0eb",
        }}
      >
        <p style={{ fontSize: 24, color: "#7da4ff", letterSpacing: 4 }}>
          FOTOĞRAF · VIDEO · WEB
        </p>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          Emir Buğra Aydoğan
        </h1>
        <p style={{ fontSize: 28, color: "#8b8880", marginTop: 24 }}>
          Kişisel portföy ve tanıtım
        </p>
      </div>
    ),
    { ...size },
  );
}
