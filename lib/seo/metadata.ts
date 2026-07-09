import type { Metadata } from "next";
import { metaData } from "@/config/site";

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function createMetadata(config: PageSeo): Metadata {
  const canonicalUrl = `${metaData.url}${config.path}`;
  const image = config.ogImage || `${metaData.url}/opengraph-image`;

  return {
    title: config.title,
    description: config.description,
    ...(config.keywords?.length && { keywords: config.keywords }),
    ...(config.noIndex && { robots: { index: false, follow: true } as const }),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [image],
    },
  };
}
