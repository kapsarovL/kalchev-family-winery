"use client";
import React from "react";
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
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "red":
        return "bg-wine-red text-white";
      case "white":
        return "bg-gold text-white";
      case "rosé":
        return "bg-wine-red/70 text-white";
      default:
        return "bg-deep-brown text-white";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white rounded-lg">
        <DialogClose className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-deep-brown/80 hover:bg-deep-brown rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Wine Image */}
          <div className="relative h-[300px] md:h-auto overflow-hidden">
            <img
              src={wine.image}
              alt={wine.name}
              className="w-full h-full object-cover md:h-[500px]"
            />
            <Badge
              variant="secondary"
              className={`absolute top-4 left-4 ${getBadgeColor(
                wine.type
              )} font-medium`}
            >
              {wine.type}
            </Badge>
          </div>

          {/* Wine Details */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-serif font-bold text-deep-brown">
                {wine.name}
              </DialogTitle>
              <DialogDescription className="text-deep-brown/60">
                Vintage {wine.year}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-grow">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-deep-brown mb-2">
                  Tasting Notes
                </h4>
                <p className="text-deep-brown/80">{wine.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-deep-brown mb-2">
                  Perfect Pairings
                </h4>
                <p className="text-deep-brown/80">
                  {wine.type === "red"
                    ? "Pairs beautifully with rich meats, aged cheeses, and hearty stews."
                    : wine.type === "white"
                    ? "Complements seafood, light pasta dishes, and soft cheeses perfectly."
                    : "An excellent match for grilled vegetables, light salads, and fresh cheeses."}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-deep-brown mb-2">
                  Winemaking
                </h4>
                <p className="text-deep-brown/80">
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
                <span className="text-deep-brown/60">In Stock</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-wine-red text-white hover:bg-gold transition-colors">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="border-wine-red text-wine-red hover:bg-cream hover:text-deep-brown transition-colors"
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
