"use client";

import React, { useState } from "react";
import { wines } from "../../data/wines";
import WineCard from "@/components/cards/WineCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type FilterType = "all" | "red" | "white" | "rosé" | "white-100" | "wineRed";

const WineGallery = () => {
  const [_activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [_searchTerm, setSearchTerm] = useState("");

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Filter wines based on active filter and search term
  const _filteredWines = wines.filter((wine) => {
    // Apply type filter
    const matchesType = _activeFilter === "all" || wine.type === _activeFilter;

    // Apply search term
    const matchesSearch =
      wine.name.toLowerCase().includes(_searchTerm.toLowerCase()) ||
      wine.description.toLowerCase().includes(_searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <section
      id="wines"
      className="py-16 md:py-24 bg-gradient-to-b from-white-200/80 to-wineRed-100/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-4">
            Our Wine Collection
          </h2>
          <p className="text-lg text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            Explore our range of premium wines, each crafted with passion and
            expertise to showcase the best of Bulgarian winemaking.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={_activeFilter === "all" ? "default" : "outline"}
              className={
                _activeFilter === "all"
                  ? "bg-wineRed-100 text-white-100 hover:bg-gold-100 transition-colors"
                  : "hover:bg-cream-100 hover:text-deepBrown-100 transition-colors"
              }
              onClick={() => handleFilterClick("all")}
            >
              All Wines
            </Button>
            <Button
              variant={_activeFilter === "wineRed" ? "default" : "outline"}
              className={
                _activeFilter === "wineRed"
                  ? "bg-wineRed-100 text-white-100 hover:bg-gold-100 transition-colors"
                  : "hover:bg-cream-100 hover:text-deepBrown-100 transition-colors"
              }
              onClick={() => handleFilterClick("wineRed")}
            >
              Red Wines
            </Button>
            <Button
              variant={_activeFilter === "white-100" ? "default" : "outline"}
              className={
                _activeFilter === "white-100"
                  ? "bg-wineRed-100 text-white-100 hover:bg-gold-100 transition-colors"
                  : "hover:bg-cream-100 hover:text-deepBrown-100 transition-colors"
              }
              onClick={() => handleFilterClick("white-100")}
            >
              White Wines
            </Button>
            <Button
              variant={_activeFilter === "rosé" ? "default" : "outline"}
              className={
                _activeFilter === "rosé"
                  ? "bg-wineRed-200 text-white-100 hover:bg-gold-100 transition-colors"
                  : "hover:bg-cream-100 hover:text-deepBrown-100 transition-colors"
              }
              onClick={() => handleFilterClick("rosé")}
            >
              Rosé Wines
            </Button>
          </div>

          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deepBrown-100/60"
              size={18}
            />
            <input
              type="text"
              placeholder="Search wines..."
              className="w-full px-10 py-2 border border-cream rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={_searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Wine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {_filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        {/* Empty State */}
        {_filteredWines.length === 0 && (
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
