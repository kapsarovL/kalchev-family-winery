"use client";
import React from "react";
import Image from "next/image";
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
import { motion } from "framer-motion";

interface WineDetailDialogProps {
  wine: Wine;
  isOpen: boolean;
  onClose: () => void;
}

const WineDetailDialog: React.FC<WineDetailDialogProps> = ({
  wine,
  isOpen,
  onClose,
}) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-cream-200 rounded-lg">
        <DialogClose asChild className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-deepBrown-100/80 hover:bg-deepBrown-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Wine Image */}
          <div className="relative h-[300px] md:h-auto overflow-hidden">
            <Image
              src={wine.image}
              alt={wine.name}
              fill={true}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <Badge
              variant="secondary"
              className={`absolute top-4 left-4 ${_getBadgeColor(
                wine.type
              )} font-medium`}
            >
              {wine.type}
            </Badge>
          </div>

          {/* Wine Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-serif font-bold text-deepBrown-100">
                {wine.name}
              </DialogTitle>
              <DialogDescription className="text-deepBrown-100/60">
                Vintage {wine.year}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-grow">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-deepBrown-100 mb-2">
                  Tasting Notes
                </h4>
                <p className="text-deepBrown-100/80">{wine.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-deepBrown-100 mb-2">
                  Perfect Pairings
                </h4>
                <p className="text-deepBrown-100/80">
                  {wine.type === "red"
                    ? "Pairs beautifully with rich meats, aged cheeses, and hearty stews."
                    : wine.type === "white"
                    ? "Complements seafood, light pasta dishes, and soft cheeses perfectly."
                    : "An excellent match for grilled vegetables, light salads, and fresh cheeses."}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-deepBrown-100 mb-2">
                  Winemaking
                </h4>
                <p className="text-deepBrown-100/80">
                  Handcrafted in small batches with traditional methods passed
                  down through generations. Carefully aged to develop complex
                  flavors and perfect balance.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-cream">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-wine-red">
                  {wine.price}
                </span>
                <span className="text-deepBrown-100/60">In Stock</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-wineRed-100 text-white hover:bg-gold-100 transition-colors">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="border-wineRed-100 text-wineRed-100 hover:bg-cream hover:text-deepBrown-100 transition-colors"
                >
                  Add to Wishlist
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
