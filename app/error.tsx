"use client";

export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-100 text-center px-4">
      <div className="max-w-md">
        <h1 className="font-playfair text-7xl text-wineRed-100 mb-2">500</h1>
        <p className="font-playfair text-xl text-deepBrown-100 mb-2">
          Something went wrong in the cellar.
        </p>
        <p className="text-sm text-deepBrown-100/60 mb-8">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-block px-6 py-3 bg-wineRed-100 text-white-100 rounded-md font-medium hover:bg-wineRed-100/90 transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
