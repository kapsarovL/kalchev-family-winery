"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import WineShowcase from "@/components/products/WineShowcase";
import { WineStockStatus, WineAwardLevel } from "@/types/wine";
import { wines } from "@/data/wines";
import { getAllStockStatuses } from "@/lib/inventory";
import { useLocale } from "@/lib/i18n/locale-context";

const FeaturedWineShowcase = () => {
  const { t } = useLocale();
  const [currentWineIndex, setCurrentWineIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stockStatuses, setStockStatuses] = useState<Record<number, WineStockStatus>>({});

  useEffect(() => {
    getAllStockStatuses().then(setStockStatuses).catch(console.error);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlaying(!videoPlaying);
  };

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
    <section className="min-h-screen py-16 relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-125"
      >
        <source src="/videos/red_wine_waves.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <button
        onClick={toggleVideo}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-cream-100/70 hover:text-cream-100 hover:bg-black/60 transition-colors"
        aria-label={videoPlaying ? "Pause video" : "Play video"}
      >
        {videoPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gold-100">
            {t.features.heading}
          </h2>
          <div className="section-underline mx-auto"></div>
          <p className="text-cream-200 max-w-2xl mx-auto font-inter">
            {t.features.subtitle}
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
              className="rounded-full border-cream-100/50 text-cream-100 hover:bg-white/20"
              aria-label={t.features.prev}
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
                      ? "bg-gold-100"
                      : "bg-cream-100/40"
                  }`}
                  aria-label={`View wine ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextWine}
              className="rounded-full border-cream-100/50 text-cream-100 hover:bg-white/20"
              aria-label={t.features.next}
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
