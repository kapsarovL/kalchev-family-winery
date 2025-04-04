"use client";

import React, { useState } from "react";
import { wines } from "../../data/wines";
import WineCard from "@/components/cards/WineCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type FilterType = "all" | "red" | "white" | "rosé";

const WineGallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Filter wines based on active filter and search term
  const filteredWines = wines.filter((wine) => {
    // Apply type filter
    const matchesType = activeFilter === "all" || wine.type === activeFilter;

    // Apply search term
    const matchesSearch =
      wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <section
      id="wines"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-cream/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-brown mb-4">
            Our Wine Collection
          </h2>
          <p className="text-lg text-deep-brown/80 max-w-2xl mx-auto">
            Explore our range of premium wines, each crafted with passion and
            expertise to showcase the best of Bulgarian winemaking.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              className={
                activeFilter === "all"
                  ? "bg-wine-red text-white hover:bg-gold transition-colors"
                  : "hover:bg-cream hover:text-deep-brown transition-colors"
              }
              onClick={() => handleFilterClick("all")}
            >
              All Wines
            </Button>
            <Button
              variant={activeFilter === "red" ? "default" : "outline"}
              className={
                activeFilter === "red"
                  ? "bg-wine-red text-white hover:bg-gold transition-colors"
                  : "hover:bg-cream hover:text-deep-brown transition-colors"
              }
              onClick={() => handleFilterClick("red")}
            >
              Red Wines
            </Button>
            <Button
              variant={activeFilter === "white" ? "default" : "outline"}
              className={
                activeFilter === "white"
                  ? "bg-wine-red text-white hover:bg-gold transition-colors"
                  : "hover:bg-cream hover:text-deep-brown transition-colors"
              }
              onClick={() => handleFilterClick("white")}
            >
              White Wines
            </Button>
            <Button
              variant={activeFilter === "rosé" ? "default" : "outline"}
              className={
                activeFilter === "rosé"
                  ? "bg-wine-red text-white hover:bg-gold transition-colors"
                  : "hover:bg-cream hover:text-deep-brown transition-colors"
              }
              onClick={() => handleFilterClick("rosé")}
            >
              Rosé Wines
            </Button>
          </div>

          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-brown/60"
              size={18}
            />
            <input
              type="text"
              placeholder="Search wines..."
              className="w-full px-10 py-2 border border-cream rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Wine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        {/* Empty State */}
        {filteredWines.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-deep-brown mb-2">
              No wines found
            </h3>
            <p className="text-deep-brown/60">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WineGallery;
