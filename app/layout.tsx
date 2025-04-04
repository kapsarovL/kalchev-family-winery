import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { metaData } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const playfairDisplay = localFont({
  src: "./fonts/PlayfairDisplayVF.ttf"
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
  },
  icon: "/favicon.ico",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
