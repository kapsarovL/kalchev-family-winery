"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, GlassWater, Utensils, Users } from "lucide-react";
import ExperienceImage from "@/public/images/wines3.webp";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/locale-context";

const WineryExperience = () => {
  const { t } = useLocale();
  return (
    <section id="experience" className="py-16 md:py-24 bg-cream-100/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-wineRed-100 mb-6">
              {t.experience.heading}
            </h2>
            <p className="text-lg text-deepBrown-100/80 mb-6">
              {t.experience.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <GlassWater className="w-6 h-6 text-gold-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    {t.experience.card1Title}
                  </h3>
                  <p className="text-deepBrown-100/70">
                    {t.experience.card1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Users className="w-6 h-6 text-wineRed-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    {t.experience.card2Title}
                  </h3>
                  <p className="text-deepBrown-100/70">
                    {t.experience.card2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Utensils className="w-6 h-6 text-gold-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    {t.experience.card3Title}
                  </h3>
                  <p className="text-deepBrown-100/70">
                    {t.experience.card3Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Calendar className="w-6 h-6 text-wineRed-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    {t.experience.card4Title}
                  </h3>
                  <p className="text-deepBrown-100/70">
                    {t.experience.card4Desc}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="bg-wineRed-100 hover:text-white-100 hover:bg-gold-100 transition-colors"
            >
              {t.experience.cta}
            </Button>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <Image
                src={ExperienceImage}
                alt="Wine tasting experience at Kalchev Family Winery"
                className="rounded-lg w-full object-cover max-h-[600px]"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -bottom-4 -left-4 bg-cream-200 p-4 rounded shadow-lg hidden md:block">
                <p className="text-wineRed-100 font-serif text-lg font-medium">
                  {t.experience.openForVisits}
                </p>
                <p className="text-deepBrown-100/70">{t.experience.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineryExperience;
