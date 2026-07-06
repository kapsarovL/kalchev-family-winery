"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Check,
  Clock,
  Wine as WineIcon,
} from "lucide-react";
import Image from "next/image";
import { Wine, WineStockStatus, WineAwardLevel } from "@/types/wine";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/lib/i18n/locale-context";

interface WineShowcaseProps {
  wine: Wine;
  className?: string;
  stockStatus: WineStockStatus;
  awardLevel?: WineAwardLevel;
}

const WineShowcase: React.FC<WineShowcaseProps> = ({
  wine,
  className,
  stockStatus,
  awardLevel,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { locale, t } = useLocale();

  // Function to render stock status badge with appropriate colors
  const renderStockStatus = () => {
    switch (stockStatus) {
      case "in-stock":
        return (
          <div className="status-badge status-badge-success">
            <Check className="h-3 w-3 mr-1" />
            In Stock
          </div>
        );
      case "limited":
        return (
          <div className="status-badge status-badge-warning">
            <Clock className="h-3 w-3 mr-1" />
            Limited Stock
          </div>
        );
      case "pre-order":
        return (
          <div className="status-badge status-badge-info">
            <WineIcon className="h-3 w-3 mr-1" />
            Pre-Order
          </div>
        );
      default:
        return null;
    }
  };

  // Function to render award badge with appropriate colors
  const renderAwardBadge = () => {
    if (!awardLevel) return null;

    switch (awardLevel) {
      case "gold":
        return (
          <div className="status-badge bg-gold-100 text-white-100 border border-gold-100/20 ml-2">
            Gold Medal
          </div>
        );
      case "silver":
        return (
          <div className="status-badge bg-white-300 bg-opacity-60 text-wineRed-300 border border-cream-200 ml-2">
            Silver Medal
          </div>
        );
      case "bronze":
        return (
          <div className="status-badge bg-wineRed-100 text-cream-100 border border-wineRed-100/20 ml-2">
            Bronze Medal
          </div>
        );
      default:
        return null;
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 bg-cream-100/30 rounded-xl p-6 shadow-sm border border-cream-200/80 ${className}`}
    >
      <div className="product-viewer-container bg-cream-100 rounded-lg shadow-sm h-[400px] relative">
        <Image
          src={wine.bottleImage || "/images/default-wine.jpg"}
          alt={wine.translations[locale].name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 drop-shadow-xl"
        />
      </div>

      <div className="product-details flex flex-col justify-center">
        <div className="mb-2">
          <Badge
            variant="outline"
            className="bg-wineRed-100/10 text-wineRed-100 border-wineRed-100"
          >
            {wine.translations[locale].type.charAt(0).toUpperCase() + wine.translations[locale].type.slice(1)} Wine
          </Badge>
          <Badge
            variant="outline"
            className="ml-2 bg-cream/40 text-deepBrown-100 border-cream-300/70"
          >
            {wine.year}
          </Badge>
        </div>

        <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-wineRed-100 mb-2">
          {wine.translations[locale].name}
        </h3>

        <p className="text-deepBrown-100/80 mb-4 font-inter">
          {wine.translations[locale].description}
        </p>

        {/* Price and status display */}
        <div className="flex items-center justify-between mb-4">
          <div className="price text-2xl font-medium text-gold-100">
            {wine.price}
          </div>
          <div className="flex">
            {renderStockStatus()}
            {renderAwardBadge()}
          </div>
        </div>

        <div className="quantity-selector flex items-center mb-6">
          <span className="mr-3 text-wineRed-100/70">Quantity:</span>
          <div className="flex items-center border border-cream-100 rounded">
            <Button
              onClick={decrementQuantity}
              className="px-3 py-1 bg-cream-300 text-deepBrown-100 hover:bg-cream-100/40 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </Button>
            <span className="px-3 py-1 text-deepBrown-100">{quantity}</span>
            <Button
              onClick={incrementQuantity}
              className="px-3 py-1 bg-cream-300 text-deepBrown-100 hover:bg-cream-100/40 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>
        </div>

        <div className="actions flex space-x-3">
          <Button
            className="flex-1 bg-wineRed-100 hover:bg-gold-100 transition-colors duration-300 text-white-200"
            aria-label={`${t.detail.addToCart}: ${wine.translations[locale].name}`}
            onClick={() => dispatch({ type: "ADD", wine, quantity })}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart ({quantity})
          </Button>
          <Button
            variant="outline"
            className="border-cream-300/70 text-deepBrown-100 hover:bg-cream-100/40 transition-colors"
            aria-label={`${t.detail.addToWishlist}: ${wine.translations[locale].name}`}
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WineShowcase;
