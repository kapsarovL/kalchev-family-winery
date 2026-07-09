import { metaData } from "@/config/site";

export interface JsonLdData {
  "@type": string;
  [key: string]: unknown;
}

export function JsonLd({ data }: { data: JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": data,
        }),
      }}
    />
  );
}

export function pageJsonLd(title: string, description: string, path: string): JsonLdData[] {
  const url = `${metaData.url}${path}`;

  return [
    {
      "@type": "WebPage",
      "@id": url,
      name: title,
      description,
      url,
      isPartOf: { "@id": `${metaData.url}/#website` },
    },
  ];
}
