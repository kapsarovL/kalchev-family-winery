import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-100 text-center px-4">
      <div className="max-w-md">
        <h1 className="font-playfair text-7xl text-wineRed-100 mb-2">404</h1>
        <p className="font-playfair text-xl text-deepBrown-100 mb-8">
          This page has vanished like a fine vintage.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-wineRed-100 text-white-100 rounded-md font-medium hover:bg-wineRed-100/90 transition-colors"
        >
          Return to the winery
        </Link>
      </div>
    </div>
  );
}
