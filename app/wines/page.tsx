"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { wines, Wine } from "@/data/wines";
import { useLocale } from "@/lib/i18n/locale-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { getBadgeColor } from "@/lib/utils";
import { useAddToCart } from "@/hooks/use-add-to-cart";

function WineCard({ wine }: { wine: Wine }) {
  const { locale } = useLocale();
  const { addToCart, added } = useAddToCart();
  const tr = wine.translations[locale];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(wine);
  }

  return (
    <Link
      href={`/wines/${wine.key}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] bg-cream-200/30 overflow-hidden">
        <Image
          src={wine.image}
          alt={`${tr.name} - ${tr.type} wine`}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Badge
          variant="secondary"
          className={`absolute top-3 left-3 ${getBadgeColor(tr.type)} font-medium`}
        >
          {tr.type}
        </Badge>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-playfair text-lg font-semibold text-deepBrown-100 group-hover:text-wineRed-100 transition-colors">
            {tr.name}
          </h3>
          <span className="text-sm text-deepBrown-100/50 shrink-0">{wine.year}</span>
        </div>

        <p className="text-sm text-deepBrown-100/60 line-clamp-2 mb-4">{tr.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-wineRed-100">{wine.price}</span>
          <Button
            size="sm"
            variant="outline"
            className="border-wineRed-100 text-wineRed-100 hover:bg-wineRed-100 hover:text-white-100"
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default function WinesPage() {
  const { t } = useLocale();

  return (
    <main className="min-h-screen bg-cream-100">
      <div className="bg-deepBrown-100 text-cream-200 py-3 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-gold-100 transition-colors">
            {t.nav.home}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gold-100 font-medium">{t.nav.wines}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-deepBrown-100 mb-4">
            {t.nav.wines}
          </h1>
          <p className="text-lg text-deepBrown-100/60 max-w-2xl mx-auto">{t.hero.paragraph}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wines.map((wine) => (
            <WineCard key={wine.key} wine={wine} />
          ))}
        </div>
      </div>
    </main>
  );
}
