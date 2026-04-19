import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Kalchev Family Winery – Premium Macedonian Wines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const heroPath = path.join(process.cwd(), "public", "images", "hero-bg.jpg");
  const heroData = await readFile(heroPath);
  const heroBase64 = `data:image/jpeg;base64,${heroData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "flex-end",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroBase64}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(30,10,5,0.92) 0%, rgba(30,10,5,0.55) 50%, rgba(30,10,5,0.15) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "52px 64px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c9a84c",
            }}
          >
            Since 1932 · Bogdanci Valley, Macedonia
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: "72px",
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
              fontSize: "26px",
              color: "rgba(253,246,236,0.75)",
            }}
          >
            Premium wines crafted with passion and tradition
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
