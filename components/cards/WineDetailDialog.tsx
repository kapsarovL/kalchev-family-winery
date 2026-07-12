"use client";
import React from "react";
import Image from "next/image";
import { getPairings } from "@/data/pairings";
import { Thermometer, Wine as WineGlass, UtensilsCrossed } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Wine } from "../../data/wines";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { useCart } from "@/lib/cart-context";

interface WineDetailDialogProps {
  wine: Wine;
  isOpen: boolean;
  onClose: () => void;
}

const WineDetailDialog: React.FC<WineDetailDialogProps> = ({ wine, isOpen, onClose }) => {
  // Get the appropriate badge color based on wine type
  const _getBadgeColor = (type: string) => {
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

  const { locale, t } = useLocale();
  const { dispatch } = useCart();
  const pairing = getPairings(wine.key);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-wineRed-100 rounded-lg">
        <DialogClose asChild className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white-100 bg-cream-300/80 hover:bg-wineRed-300 hover:text-cream-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Wine Image */}
          <div className="relative h-[300px] md:h-auto overflow-hidden bg-cream-100/20">
            <Image
              src={wine.image}
              alt={wine.translations[locale].name}
              fill={true}
              style={{ objectFit: "contain", padding: "1rem" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Badge
              variant="secondary"
              className={`absolute top-4 left-4 ${_getBadgeColor(
                wine.translations[locale].type,
              )} font-medium`}
            >
              {wine.translations[locale].type}
            </Badge>
          </div>

          {/* Wine Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-serif font-bold text-cream-100">
                {wine.translations[locale].name}
              </DialogTitle>
              <DialogDescription className="text-cream-100/80">
                {t.detail.vintage} {wine.year}
              </DialogDescription>
            </DialogHeader>

            <div className="grow">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gold-100 mb-2">{t.detail.tastingNotes}</h4>
                <p className="text-cream-100/80">{wine.translations[locale].description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gold-100 mb-3">
                  {t.detail.perfectPairings}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-cream-100/80">
                    <UtensilsCrossed size={15} className="mt-0.5 shrink-0 text-gold-100" />
                    <span>{pairing.foods.join(" · ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cream-100/80">
                    <Thermometer size={15} className="shrink-0 text-gold-100" />
                    <span>
                      {t.detail.serveAt} {pairing.temperature}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-cream-100/80">
                    <WineGlass size={15} className="shrink-0 text-gold-100" />
                    <span>{pairing.glassType} glass</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gold-100 mb-2">{t.detail.winemaking}</h4>
                <p className="text-cream-100/80">{t.detail.winemakingDesc}</p>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-cream-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-cream-100">{wine.price}</span>
                <span className="text-cream-100/60">{t.detail.inStock}</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  className="bg-wineRed-100 text-white-200 hover:text-wineRed-100 border-cream-300 border hover:bg-gold-100 transition-colors"
                  onClick={() => {
                    dispatch({ type: "ADD", wine, quantity: 1 });
                    onClose();
                  }}
                >
                  {t.detail.addToCart}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WineDetailDialog;
