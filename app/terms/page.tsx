import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kalchev Family Winery",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-6">
          Terms &amp; Conditions
        </h1>
        <div className="prose prose-wine max-w-none font-inter text-deepBrown-300 space-y-4">
          <p>Last updated: July 2026</p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">1. Orders</h2>
          <p>
            All orders are subject to availability. We reserve the right to cancel any order.
            Payment is collected upon delivery unless otherwise stated.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">2. Pricing</h2>
          <p>
            All prices are in Euros (EUR) and include applicable taxes unless stated otherwise.
            Prices are subject to change without notice.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">3. Delivery</h2>
          <p>
            Delivery times are estimates and may vary. We are not responsible for delays caused by
            third-party carriers or circumstances beyond our control.
          </p>
          <h2 className="text-xl font-playfair font-semibold text-deepBrown-300">4. Contact Us</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:info@kalchevwinery.com" className="text-wineRed-100 underline">
              info@kalchevwinery.com
            </a>
            .
          </p>
        </div>
        <div className="mt-12 pt-8 border-t border-deepBrown-100/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-wineRed-100 hover:text-wineRed-100/80 font-medium transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
