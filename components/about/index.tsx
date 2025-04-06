"use client";
import AboutImage from "@/public/images/vranec.png";
import Image from "next/image";

import React from "react";

const AboutPage = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-cream-100 h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/5">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] flex justify-center items-cente">
              <Image
                src={AboutImage}
                alt="The Kalchev Family Winery vineyard"
                fit="true"
                sizes="(max-width: 568px) 100vw, 40vw"
                className="object-content object-center"
                priority
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 md:-bottom-6 md:-right-6 bg-cream-300 p-2 sm:p-3 md:p-4 rounded shadow-lg block">
                <p className="text-wineRed-100 font-playfair font-bold text-base sm:text-lg">
                  Est. 1932
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 bg-wineRed-200 px-5 py-8 rounded-lg shadow-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gold-100 mb-6">
              Our Family Heritage
            </h2>
            <p className="text-lg text-cream-100/80 mb-4">
              For over 90 years, the Kalchev family has been dedicated to the
              art of winemaking in Bulgaria's renowned Thracian Valley, where
              the perfect combination of soil, climate, and tradition creates
              wines of exceptional character.
            </p>
            <p className="text-lg text-cream-200/80 mb-4">
              Our vineyards stretch across 50 hectares of rolling hills, where
              we grow traditional Bulgarian varieties like Mavrud and Rubin
              alongside international classics such as Cabernet Sauvignon and
              Chardonnay.
            </p>
            <p className="text-lg text-cream-200/80 mb-4">
              Every bottle of Kalchev wine tells the story of our family's
              passion, the land we cultivate, and the time-honored techniques
              passed down through generations, combined with modern, sustainable
              practices.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-cream-300">
                  50+
                </h3>
                <p className="text-cream-200/70">Hectares of Vineyards</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-cream-300">
                  12
                </h3>
                <p className="text-cream-200/70">Grape Varieties</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-cream-300">
                  90+
                </h3>
                <p className="text-cream-200/70">Years of Tradition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
