"use client";

import React, { useState } from "react";
import { Wine } from "../data/wines";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WineDetailDialog from "./WineDetailDialog";
import { motion } from "framer-motion";

interface WineCardProps {
  wine: Wine;
}

const WineCard: React.FC<WineCardProps> = ({ wine }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <>
      <motion.div
        className="group rounded-lg overflow-hidden shadow-md bg-white transition-all duration-300 hover:shadow-xl"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative h-[250px] overflow-hidden">
          <img
            src={wine.image}
            alt={wine.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className={`absolute top-3 right-3 ${getBadgeColor(
              wine.type
            )} font-medium`}
          >
            {wine.type}
          </Badge>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-bold text-deep-brown">
              {wine.name}
            </h3>
            <span className="text-lg font-medium text-wine-red">
              {wine.price}
            </span>
          </div>

          <div className="mb-3">
            <span className="text-sm text-deep-brown/60">
              Vintage {wine.year}
            </span>
          </div>

          <p className="text-deep-brown/80 mb-4 line-clamp-3">
            {wine.description}
          </p>

          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="bg-wine-red text-white hover:bg-gold transition-colors w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              View Details
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Wine Detail Dialog */}
      <WineDetailDialog
        wine={wine}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default WineCard;
