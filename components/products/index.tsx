"use client";

import { useState } from "react";
import { wines } from "../../data/wines";
import WineCard from "@/components/cards/WineCard";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

type FilterType = "all" | "red" | "white" | "rosé";
type SortType = "default" | "price-asc" | "price-desc";

const WineGallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortType>("default");
  const { locale, t } = useLocale();

  const filteredWines = wines
    .filter((wine) => {
      const matchesType = activeFilter === "all" || wine.translations["en"].type === activeFilter;
      const matchesSearch =
        wine.translations[locale].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.translations[locale].description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "price-asc")
        return parseFloat(a.price.replace("€", "")) - parseFloat(b.price.replace("€", ""));
      if (sort === "price-desc")
        return parseFloat(b.price.replace("€", "")) - parseFloat(a.price.replace("€", ""));
      return 0;
    });

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: t.wines.all, value: "all" },
    { label: t.wines.red, value: "red" },
    { label: t.wines.white, value: "white" },
    { label: t.wines.rose, value: "rosé" },
  ];

  const sortOptions: { label: string; value: SortType }[] = [
    { label: t.wines.sortDefault, value: "default" },
    { label: t.wines.sortPriceAsc, value: "price-asc" },
    { label: t.wines.sortPriceDesc, value: "price-desc" },
  ];

  return (
    <section
      id="wines"
      className="py-16 md:py-24 bg-linear-to-b from-white-200/80 to-wineRed-100/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-4">
            {t.wines.heading}
          </h2>
          <p className="text-lg text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            {t.wines.subheading}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Type filters */}
          <div className="flex gap-2 flex-wrap justify-center">
            {filterButtons.map(({ label, value }) => (
              <Button
                key={value}
                variant={activeFilter === value ? "default" : "outline"}
                className={
                  activeFilter === value
                    ? "bg-wineRed-100 text-white-100 hover:bg-gold-100 transition-colors"
                    : "hover:bg-cream-100 hover:text-deepBrown-100 transition-colors"
                }
                onClick={() => setActiveFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Sort dropdown */}
            <div className="relative">
              <ArrowUpDown
                className="absolute left-3 top-1/2 -translate-y-1/2 text-deepBrown-100/60 pointer-events-none"
                size={16}
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="pl-9 pr-4 py-2 border border-cream rounded-md bg-white-100 text-deepBrown-100 focus:outline-hidden focus:ring-2 focus:ring-gold/50 text-sm"
                aria-label="Sort wines"
              >
                {sortOptions.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1 md:w-56">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-deepBrown-100/60"
                size={18}
              />
              <input
                type="text"
                placeholder={t.wines.search}
                className="w-full pl-10 pr-4 py-2 border border-cream rounded-md focus:outline-hidden focus:ring-2 focus:ring-gold/50 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search wines"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        {filteredWines.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-deepBrown-100 mb-2">{t.wines.noResults}</h3>
            <p className="text-deepBrown-100/80">{t.wines.noResultsSub}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WineGallery;
