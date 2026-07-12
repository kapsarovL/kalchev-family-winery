import { notFound } from "next/navigation";
import { Metadata } from "next";
import { wines, getWineByKey } from "@/data/wines";
import { metaData } from "@/config/site";
import { parsePrice } from "@/lib/price";
import { JsonLd } from "@/lib/seo/json-ld";
import WineDetailContent from "@/components/wine/wine-detail-content";

interface WinePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return wines.map((wine) => ({
    slug: wine.key,
  }));
}

export async function generateMetadata({ params }: WinePageProps): Promise<Metadata> {
  const { slug } = await params;
  const wine = getWineByKey(slug);
  if (!wine) return {};

  const en = wine.translations.en;
  const canonicalUrl = `${metaData.url}/wines/${wine.key}`;
  const pageTitle = `${en.name} ${wine.year} | Kalchev Family Winery`;
  const pageDescription = `${en.description.slice(0, 155)}...`;
  const image = metaData.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      en.name,
      `${en.name} ${wine.year}`,
      `${en.type} wine Macedonia`,
      "Kalchev Family Winery",
      "Bogdanci wine",
      "Macedonian wine",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${en.name} - Kalchev Family Winery`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
  };
}

export default async function WinePage({ params }: WinePageProps) {
  const { slug } = await params;
  const wine = getWineByKey(slug);
  if (!wine) notFound();

  const en = wine.translations.en;
  const price = parsePrice(wine.price);
  const canonicalUrl = `${metaData.url}/wines/${wine.key}`;

  const jsonLdData = [
    {
      "@type": "Product",
      name: `${en.name} ${wine.year}`,
      description: en.description,
      image: metaData.ogImage,
      brand: {
        "@type": "Brand",
        name: "Kalchev Family Winery",
      },
      category: `${en.type} wine`,
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: "EUR",
        price: price,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Kalchev Family Winery",
        },
      },
    },
    {
      "@type": "WebPage",
      "@id": canonicalUrl,
      name: `${en.name} ${wine.year} - Kalchev Family Winery`,
      description: pageDescription(en),
      url: canonicalUrl,
      isPartOf: { "@id": `${metaData.url}/#website` },
    },
  ];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <WineDetailContent wine={wine} />
    </>
  );
}

function pageDescription(en: { description: string }) {
  return en.description.slice(0, 155) + "...";
}
