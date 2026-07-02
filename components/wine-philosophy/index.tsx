"use client";
import React from "react";
import { Leaf, Droplets, Sun, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

const WinePhilosophy = () => {
  const { t } = useLocale();
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-4">
            {t.philosophy.heading}
          </h2>
          <p className="text-lg text-deepBrown-100/80 font-inter max-w-2xl mx-auto">
            {t.philosophy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              {t.philosophy.pillar1Title}
            </h3>
            <p className="text-slate-700">
              {t.philosophy.pillar1Desc}
            </p>
          </div>

          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              {t.philosophy.pillar2Title}
            </h3>
            <p className="text-slate-700">
              {t.philosophy.pillar2Desc}
            </p>
          </div>

          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Sun className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              {t.philosophy.pillar3Title}
            </h3>
            <p className="text-slate-700">
              {t.philosophy.pillar3Desc}
            </p>
          </div>

          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              {t.philosophy.pillar4Title}
            </h3>
            <p className="text-slate-700">
              {t.philosophy.pillar4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinePhilosophy;
