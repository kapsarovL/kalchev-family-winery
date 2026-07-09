"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Wine } from "../../data/wines";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WineDetailDialog from "./WineDetailDialog";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

interface WineCardProps {
  wine: Wine;
}

const WineCard: React.FC<WineCardProps> = ({ wine }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { dispatch } = useCart();
  const { locale, t } = useLocale();

  // Get the appropriate badge color based on wine type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "red":
        return "bg-wineRed-100 text-white-100";
      case "white":
        return "bg-gold-100 text-white-100";
      case "rosé":
        return "bg-wineRed-100/70 text-white-100";
      default:
        return "bg-deepBrown-100 text-white-100";
    }
  };

  return (
    <>
      <motion.div
        className="group rounded-lg overflow-hidden shadow-md bg-cream-200/30 transition-all duration-300 hover:shadow-xl"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative h-[300px] overflow-hidden bg-cream-100/60">
          <Image
            src={wine.image}
            alt={wine.translations[locale].name}
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105 py-3"
          />
          <Badge
            variant="secondary"
            className={`absolute top-3 right-3 ${getBadgeColor(
              wine.translations[locale].type,
            )} font-medium`}
          >
            {wine.translations[locale].type}
          </Badge>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-bold text-deepBrown-300">
              {wine.translations[locale].name}
            </h3>
            <span className="text-lg font-medium text-oliveGreen-300">{wine.price}</span>
          </div>

          <div className="mb-3">
            <span className="text-sm text-deepBrown-100/80">
              {t.wines.vintage} {wine.year}
            </span>
          </div>

          <p className="text-wineRed-300 mb-4 line-clamp-3">
            {wine.translations[locale].description}
          </p>

          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="bg-wineRed-100 text-white-100 hover:bg-gold-100 transition-colors flex-1"
              onClick={() => setIsDialogOpen(true)}
            >
              {t.wines.viewDetails}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-wineRed-100/40 text-wineRed-100 hover:bg-wineRed-100 hover:text-white-100 transition-colors"
              onClick={() => dispatch({ type: "ADD", wine, quantity: 1 })}
              aria-label={`${t.detail.addToCart}: ${wine.translations[locale].name}`}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Wine Detail Dialog */}
      <WineDetailDialog wine={wine} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default WineCard;
