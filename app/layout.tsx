import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { metaData } from "@/config/site";
import "./globals.css";

const playfairDisplay = localFont({
  src: "./fonts/PlayfairDisplayVF.ttf",
  variable: "--font-playfair-display",
  weight: "100, 200, 300, 400, 500, 600, 700, 800, 900",
});

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100, 200, 300, 400, 500, 600, 700, 800, 900",
});

export const metadata: Metadata = {
  title: {
    default: metaData.name,
    template: `%s | ${metaData.name}`,
  },
  description: metaData.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: metaData.url,
    title: metaData.title,
    description: metaData.description,
    siteName: metaData.name,
    images: [
      {
        url: `${metaData.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Kalchev Family Winery – Premium Macedonian Wines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaData.title,
    description: metaData.description,
    images: [`${metaData.url}/opengraph-image`],
  },
  icons: "/favicon.ico",
};

import { ClientLayout } from "./client-layout";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
