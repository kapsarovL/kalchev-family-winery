"use client";
import React from "react";
import { Leaf, Droplets, Sun, Sparkles } from "lucide-react";

const WinePhilosophy = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-4">
            Our Wine Philosophy
          </h2>
          <p className="text-lg text-deepBrown-100/80 font-inter max-w-2xl mx-auto">
            We believe in letting nature express itself through every sip,
            crafting wines that honor tradition while embracing sustainable
            innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              Sustainable Farming
            </h3>
            <p className="text-slate-700">
              We cultivate our vineyards with respect for nature, using organic
              practices to ensure the health of our soil and ecosystem.
            </p>
          </div>

          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              Minimal Intervention
            </h3>
            <p className="text-slate-700">
              Our winemaking approach focuses on gentle handling and minimal
              processing to preserve the authentic character of our grapes.
            </p>
          </div>

          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Sun className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              Terroir Expression
            </h3>
            <p className="text-slate-700">
              We celebrate the unique combination of soil, climate, and
              tradition that makes our wines distinctly Bulgarian and uniquely
              Kalchev.
            </p>
          </div>

          <div className="bg-[#F4E8D5] p-6 rounded-lg text-center transition-transform hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-oliveGreen-100 text-white-200 mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810] mb-2">
              Artisanal Quality
            </h3>
            <p className="text-slate-700">
              Each bottle represents our family's commitment to excellence, with
              attention to detail at every step from vine to glass.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinePhilosophy;
