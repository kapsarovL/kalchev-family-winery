import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Kalchev Family Winery",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-6">Cookie Policy</h1>
        <div className="prose prose-wine max-w-none font-inter text-deepBrown-300 space-y-4">
          <p>Last updated: July 2026</p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit our website. They help
            us provide a better browsing experience and analyze site traffic.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            2. Essential Cookies
          </h2>
          <p>
            These cookies are necessary for the website to function properly, including session
            management and cart functionality.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            3. Analytics Cookies
          </h2>
          <p>
            We use Google Analytics to understand how visitors interact with our website. This data
            is anonymized and used only to improve our services.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            4. Managing Cookies
          </h2>
          <p>
            You can control cookie preferences through your browser settings. Disabling essential
            cookies may affect website functionality.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">5. Contact Us</h2>
          <p>
            For questions about our cookie policy, contact us at{" "}
            <a href="mailto:info@kalchevwinery.com" className="text-wineRed-100 underline">
              info@kalchevwinery.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
