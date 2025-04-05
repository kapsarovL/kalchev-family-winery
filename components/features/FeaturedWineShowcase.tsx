"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WineShowcase from "@/components/products/WineShowcase"; // Assuming you have a WineShowcase component
import { wines } from "../../data/wines"; // Assuming you have a wines data file

const FeaturedWineShowcase = () => {
  const [currentWineIndex, setCurrentWineIndex] = useState(0);

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

  const getWineStatus = (index) => {};

  const getWineAward = (index) => {};

  return (
    <section className="py-16 bg-white-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary">
            Featured Wine
          </h2>
          <div className="section-underline mx-auto"></div>
          <p className="text-deepBrown-100/80 max-w-2xl mx-auto">
            Explore our premium selection in a new interactive way. Rotate the
            bottle to admire the craftsmanship and discover the unique character
            of each wine.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <WineShowcase
            wine={wines[currentWineIndex]}
            stockStatus={getWineStatus(currentWineIndex)}
            awardLevel={getWineAward(currentWineIndex)}
          />

          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevWine}
              className="rounded-full border-secondary/70 text-deepBrown-100 hover:bg-secondary/20"
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
                      ? "bg-cream-100"
                      : "bg-cream-100/30"
                  }`}
                  aria-label={`View wine ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextWine}
              className="rounded-full border-secondary/70 text-deepBrown-100 hover:bg-secondary/20"
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
