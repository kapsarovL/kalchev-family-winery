"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WineShowcase from "@/components/products/WineShowcase";
import { WineStockStatus, WineAwardLevel } from "@/types/wine";
import { wines } from "@/data/wines";
import { getAllStockStatuses } from "@/lib/inventory";
import { useLocale } from "@/lib/i18n/locale-context";

const FeaturedWineShowcase = () => {
  const { t } = useLocale();
  const [currentWineIndex, setCurrentWineIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isHoveredRef = useRef(false);

  const [stockStatuses, setStockStatuses] = useState<Record<number, WineStockStatus>>({});

  useEffect(() => {
    getAllStockStatuses().then(setStockStatuses).catch(console.error);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isHoveredRef.current) return;
    if (e.key === "ArrowLeft") {
      setCurrentWineIndex((prev) => (prev > 0 ? prev - 1 : wines.length - 1));
    }
    if (e.key === "ArrowRight") {
      setCurrentWineIndex((prev) => (prev < wines.length - 1 ? prev + 1 : 0));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const prevWine = () => {
    setCurrentWineIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : wines.length - 1));
  };

  const nextWine = () => {
    setCurrentWineIndex((prevIndex) => (prevIndex < wines.length - 1 ? prevIndex + 1 : 0));
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
    <section
      ref={sectionRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="min-h-screen py-12 md:py-16 relative overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-150 object-right-top md:scale-125 md:object-center"
      >
        <source src="/videos/red_wine_waves.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gold-100">
            {t.features.heading}
          </h2>
          <div className="section-underline mx-auto"></div>
          <p className="text-white max-w-2xl mx-auto font-inter">{t.features.subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {wines[currentWineIndex] && (
            <WineShowcase
              wine={wines[currentWineIndex]}
              stockStatus={getWineStatus(currentWineIndex)}
              awardLevel={getWineAward(currentWineIndex)}
            />
          )}

          <div className="flex items-center justify-center mt-6 sm:mt-8 gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevWine}
              className="group relative rounded-full border-white/20 bg-white/10 text-cream-100 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 hover:border-white/40 hover:shadow-gold-100/20 focus-visible:ring-2 focus-visible:ring-gold-100 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent size-10 sm:size-12"
              aria-label={t.features.prev}
            >
              <ChevronLeft className="size-4 sm:size-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </Button>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {wines.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWineIndex(index)}
                  className={`relative transition-all duration-300 rounded-full ${
                    currentWineIndex === index
                      ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-gold-100"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-cream-100/40 hover:bg-cream-100/70"
                  }`}
                  aria-label={`View wine ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextWine}
              className="group relative rounded-full border-white/20 bg-white/10 text-cream-100 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/25 hover:border-white/40 hover:shadow-gold-100/20 focus-visible:ring-2 focus-visible:ring-gold-100 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent size-10 sm:size-12"
              aria-label={t.features.next}
            >
              <ChevronRight className="size-4 sm:size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWineShowcase;
