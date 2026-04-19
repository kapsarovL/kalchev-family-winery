"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WineShowcase from "@/components/products/WineShowcase";
import { WineStockStatus, WineAwardLevel } from "@/types/wine";
import { wines } from "@/data/wines";
import { getAllStockStatuses } from "@/lib/inventory";

// Interface removed as it's now imported from types/wine.ts

const FeaturedWineShowcase = () => {
  const [currentWineIndex, setCurrentWineIndex] = useState(0);

  const [stockStatuses, setStockStatuses] = useState<Record<number, WineStockStatus>>({});

  useEffect(() => {
    getAllStockStatuses().then(setStockStatuses).catch(() => {});
  }, []);

  const prevWine = () => {
    setCurrentWineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : wines.length - 1
    );
  };

  const nextWine = () => {
    setCurrentWineIndex((prevIndex) =>
      prevIndex < wines.length - 1 ? prevIndex + 1 : 0
    );
  };

  const getWineStatus = (index: number): WineStockStatus => {
    if (!wines[index]) return "in-stock";
    return stockStatuses[wines[index].id] ?? "in-stock";
  };

  const getWineAward = (index: number): WineAwardLevel => {
    if (!wines[index]) return undefined;
    if (wines[index].id === 1) return "gold";
    if (wines[index].id === 3) return "silver";
    if (wines[index].id === 6) return "bronze";
    return undefined;
  };

  return (
    <section className="py-16 bg-white-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-wineRed-100">
            Featured Wine
          </h2>
          <div className="section-underline mx-auto"></div>
          <p className="text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            Explore our premium selection in a new interactive way. Rotate the
            bottle to admire the craftsmanship and discover the unique character
            of each wine.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {wines[currentWineIndex] && (
            <WineShowcase
              wine={wines[currentWineIndex]}
              stockStatus={getWineStatus(currentWineIndex)}
              awardLevel={getWineAward(currentWineIndex)}
            />
          )}

          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevWine}
              className="rounded-full border-cream-300/70 text-oliveGreen-100 hover:bg-wineRed-100/20"
              aria-label="Previous wine"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-1.5">
              {wines.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWineIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentWineIndex === index
                      ? "bg-cream-300"
                      : "bg-cream-300/30"
                  }`}
                  aria-label={`View wine ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextWine}
              className="rounded-full border-cream-300/70 text-oliveGreen-100 hover:bg-wineRed-100/20"
              aria-label="Next wine"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWineShowcase;
