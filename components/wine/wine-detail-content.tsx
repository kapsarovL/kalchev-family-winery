"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wine } from "@/data/wines";
import { getPairings } from "@/data/pairings";
import { useLocale } from "@/lib/i18n/locale-context";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Thermometer,
  Wine as WineGlass,
  UtensilsCrossed,
  ArrowLeft,
  ShoppingCart,
  Check,
} from "lucide-react";
import { getBadgeColor } from "@/lib/utils";
import { useAddToCart } from "@/hooks/use-add-to-cart";

interface WineDetailContentProps {
  wine: Wine;
}

export default function WineDetailContent({ wine }: WineDetailContentProps) {
  const { locale, t } = useLocale();
  const { addToCart, added } = useAddToCart();
  const { state } = useCart();
  const tr = wine.translations[locale];
  const pairing = getPairings(wine.key);
  const inCart = state.items.some((item) => item.wine.key === wine.key);

  return (
    <main className="min-h-screen bg-cream-100">
      {/* Breadcrumb */}
      <div className="bg-deepBrown-100 text-cream-200 py-3 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-gold-100 transition-colors">
            {t.nav.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#wines" className="hover:text-gold-100 transition-colors">
            {t.nav.wines}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gold-100 font-medium">{tr.name}</span>
        </nav>
      </div>

      {/* Wine Detail */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/#wines"
          className="inline-flex items-center gap-2 text-deepBrown-100 hover:text-wineRed-100 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.nav.wines}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Wine Image */}
          <div className="relative aspect-square bg-cream-200/50 rounded-xl overflow-hidden">
            <Image
              src={wine.image}
              alt={`${tr.name} - ${tr.type} wine`}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <Badge
              variant="secondary"
              className={`absolute top-4 left-4 ${getBadgeColor(tr.type)} font-medium text-sm`}
            >
              {tr.type}
            </Badge>
          </div>

          {/* Wine Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-medium text-deepBrown-100/60 uppercase tracking-wider">
                {t.detail.vintage} {wine.year}
              </span>
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-deepBrown-100 mb-4">
              {tr.name}
            </h1>

            <p className="text-lg text-deepBrown-100/70 leading-relaxed mb-8">{tr.description}</p>

            {/* Pairings */}
            <div className="bg-cream-200/50 rounded-xl p-6 mb-8">
              <h2 className="font-playfair text-xl font-semibold text-deepBrown-100 mb-4">
                {t.detail.perfectPairings}
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-deepBrown-100/80">
                  <UtensilsCrossed size={18} className="mt-0.5 shrink-0 text-wineRed-100" />
                  <span>{pairing.foods.join(" · ")}</span>
                </div>
                <div className="flex items-center gap-3 text-deepBrown-100/80">
                  <Thermometer size={18} className="shrink-0 text-wineRed-100" />
                  <span>
                    {t.detail.serveAt} {pairing.temperature}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-deepBrown-100/80">
                  <WineGlass size={18} className="shrink-0 text-wineRed-100" />
                  <span>{pairing.glassType} glass</span>
                </div>
              </div>
            </div>

            {/* Winemaking */}
            <div className="mb-8">
              <h2 className="font-playfair text-xl font-semibold text-deepBrown-100 mb-3">
                {t.detail.winemaking}
              </h2>
              <p className="text-deepBrown-100/70 leading-relaxed">{t.detail.winemakingDesc}</p>
            </div>

            {/* Price + CTA */}
            <div className="mt-auto pt-6 border-t border-deepBrown-100/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-wineRed-100">{wine.price}</span>
                <span className="text-sm text-deepBrown-100/60">{t.detail.inStock}</span>
              </div>

              <Button
                size="lg"
                className="w-full bg-wineRed-100 text-white-100 hover:bg-wineRed-100/90 transition-colors"
                onClick={() => addToCart(wine)}
                disabled={added}
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {t.detail.addToCart}
                  </>
                )}
              </Button>

              {inCart && !added && (
                <p className="text-sm text-deepBrown-100/60 text-center mt-2">{t.detail.inStock}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
