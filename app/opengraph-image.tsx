import { ImageResponse } from "next/og";

export const alt = "Kalchev Family Winery – Premium Macedonian Wines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        fontFamily: "system-ui",
        background: "linear-gradient(135deg, #2c1810 0%, #4a2c1a 50%, #2c1810 100%)",
      }}
    >
      <div
        style={{
          padding: "52px 64px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a84c",
          }}
        >
          Since 2008 · Bogdanci Valley, Macedonia
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 72,
            fontWeight: 700,
            color: "#fdf6ec",
            lineHeight: 1.05,
          }}
        >
          Kalchev Family Winery
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 26,
            color: "rgba(253,246,236,0.75)",
          }}
        >
          Premium wines crafted with passion and tradition
        </p>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
