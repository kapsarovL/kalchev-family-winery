import { createMetadata, JsonLd, pageJsonLd } from "@/lib/seo";
import { metaData } from "@/config/site";
import HomePage from "./home-page";

export const metadata = createMetadata({
  description: metaData.description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={pageJsonLd(
          "Kalchev Family Winery | Premium Macedonian Wines",
          metaData.description,
          "/",
        )}
      />
      <HomePage />
    </>
  );
}
