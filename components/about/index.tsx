"use client";
import AboutImage from "@/public/images/vranec.png";
import Image from "next/image";

import React from "react";

const AboutPage = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-cream-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative h-[400px] md:h-[500px] ">
              <Image
                src={AboutImage}
                alt="The Kalchev Family Winery vineyard"
                className="rounded-lg shadow-xl"
                fill={true}
                sizes="(max-width: 50px) "
                style={{ objectFit: "fit" }}
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-cream-300 p-4 rounded shadow-lg hidden md:block">
                <p className="text-white font-serif text-lg">Est. 1932</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-cream-200">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deeBrown-100 mb-6">
              Our Family Heritage
            </h2>
            <p className="text-lg text-deepBrown-100/80 mb-4">
              For over 90 years, the Kalchev family has been dedicated to the
              art of winemaking in Bulgaria's renowned Thracian Valley, where
              the perfect combination of soil, climate, and tradition creates
              wines of exceptional character.
            </p>
            <p className="text-lg text-deepBrown-100/80 mb-4">
              Our vineyards stretch across 50 hectares of rolling hills, where
              we grow traditional Bulgarian varieties like Mavrud and Rubin
              alongside international classics such as Cabernet Sauvignon and
              Chardonnay.
            </p>
            <p className="text-lg text-deep-brown/80 mb-4">
              Every bottle of Kalchev wine tells the story of our family's
              passion, the land we cultivate, and the time-honored techniques
              passed down through generations, combined with modern, sustainable
              practices.
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-wine-red">
                  50+
                </h3>
                <p className="text-deep-brown/70">Hectares of Vineyards</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gold">12</h3>
                <p className="text-deep-brown/70">Grape Varieties</p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-wine-red">
                  90+
                </h3>
                <p className="text-deep-brown/70">Years of Tradition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
