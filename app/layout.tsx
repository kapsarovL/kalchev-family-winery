import { ReactNode } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { metaData } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import type { Locale } from "@/lib/i18n/translations";

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
  metadataBase: new URL(metaData.url),
  title: {
    default: metaData.name,
    template: `%s | ${metaData.name}`,
  },
  description: metaData.description,
  keywords: metaData.keywords,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: metaData.url,
  },
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

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const initialLocale = (cookieStore.get("kalchev-locale")?.value ?? "en") as Locale;

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/images/hero-background.avif"
          as="image"
          type="image/avif"
          media="(min-width: 1025px)"
        />
        <link
          rel="preload"
          href="/images/hero-tablet.avif"
          as="image"
          type="image/avif"
          media="(min-width: 641px) and (max-width: 1024px)"
        />
        <link
          rel="preload"
          href="/images/hero-mobile.avif"
          as="image"
          type="image/avif"
          media="(max-width: 640px)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Winery",
                  "@id": `${metaData.url}/#winery`,
                  name: metaData.name,
                  url: metaData.url,
                  description: metaData.description,
                  image: `${metaData.url}/og-image.jpg`,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Bogdanci",
                    addressCountry: "MK",
                  },
                  foundingDate: "1932",
                  servesCuisine: "Macedonian wine",
                  priceRange: "€€€",
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${metaData.url}/#business`,
                  name: metaData.name,
                  url: metaData.url,
                  parentOrganization: { "@id": `${metaData.url}/#winery` },
                  description: metaData.description,
                  image: `${metaData.url}/og-image.jpg`,
                },
                {
                  "@type": "Organization",
                  "@id": `${metaData.url}/#organization`,
                  name: metaData.name,
                  url: metaData.url,
                  logo: `${metaData.url}/icon.png`,
                  description: metaData.description,
                  foundingDate: "1932",
                  areaServed: [
                    { "@type": "Country", name: "Macedonia" },
                    { "@type": "Country", name: "Greece" },
                    { "@type": "Country", name: "United States" },
                  ],
                  sameAs: [metaData.links.facebook, metaData.links.instagram],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ClientLayout initialLocale={initialLocale}>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
