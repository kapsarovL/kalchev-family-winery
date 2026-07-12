import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kalchev Family Winery",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-6">Privacy Policy</h1>
        <div className="prose prose-wine max-w-none font-inter text-deepBrown-300 space-y-4">
          <p>Last updated: July 2026</p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name, email address, phone
            number, and delivery address when you place an order or sign up for our newsletter.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to process orders, send newsletters (with your consent), and
            improve our services. We do not sell or share your personal information with third
            parties for marketing purposes.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">
            3. Data Security
          </h2>
          <p>
            We implement appropriate security measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">4. Contact Us</h2>
          <p>
            For questions about this policy, contact us at{" "}
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
