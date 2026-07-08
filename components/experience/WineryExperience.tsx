"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, GlassWater, Utensils, Users, ArrowRight } from "lucide-react";
import ExperienceImage from "@/public/images/glass-wine.webp";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/locale-context";

const cards = [
  { icon: GlassWater, color: "text-gold-100", key: "card1" },
  { icon: Users, color: "text-wineRed-100", key: "card2" },
  { icon: Utensils, color: "text-gold-100", key: "card3" },
  { icon: Calendar, color: "text-wineRed-100", key: "card4" },
] as const;

const WineryExperience = () => {
  const { t } = useLocale();
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-12 md:py-24 min-h-[500px] sm:min-h-[600px] md:min-h-[750px] lg:min-h-[850px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100/60 via-cream-100/20 to-cream-200/40" />
      <div className="absolute top-0 right-0 size-48 md:size-72 lg:size-96 bg-wineRed-100/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 size-36 md:size-56 lg:size-72 bg-gold-100/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 bg-wineRed-100/10 rounded-full text-wineRed-100 text-sm font-medium mb-4 mx-auto lg:mx-0">
              {t.experience.openForVisits}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-deepBrown-100 mb-6 leading-tight">
              {t.experience.heading}
            </h2>
            <p className="text-lg text-deepBrown-100/80 mb-8 leading-relaxed">
              {t.experience.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 md:mb-10">
              {cards.map(({ icon: Icon, color, key }) => (
                <div
                  key={key}
                  className="group flex items-start p-4 rounded-xl bg-white-200/50 backdrop-blur-sm border border-cream-100/40 hover:bg-white-200/70 hover:border-gold-100/30 transition-all duration-300"
                >
                  <div className="mr-4 mt-0.5 p-2.5 rounded-lg bg-white-200/60">
                    <Icon className={`size-5 ${color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-deepBrown-100 mb-1">
                      {t.experience[`${key}Title`]}
                    </h3>
                    <p className="text-sm text-deepBrown-100/60 leading-relaxed">
                      {t.experience[`${key}Desc`]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="group bg-wineRed-100 hover:bg-wineRed-200 text-cream-100 px-8 py-6 text-base shadow-lg shadow-wineRed-100/20 hover:shadow-xl hover:shadow-wineRed-100/30 transition-all duration-300 mx-auto lg:mx-0"
            >
              {t.experience.cta}
              <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative flex flex-col items-center justify-start -mt-12 md:-mt-24">
              <div className="absolute size-48 md:size-64 lg:size-80 rounded-full bg-gradient-to-br from-wineRed-100/15 via-gold-100/10 to-transparent blur-2xl animate-pulse" />
              <div className="relative">
                <Image
                  src={ExperienceImage}
                  alt="Wine tasting experience at Kalchev Family Winery"
                  className="w-full object-contain h-[400px] sm:h-[500px] md:h-[650px] lg:h-[750px] xl:h-[850px] drop-shadow-2xl mb-0 md:-mb-40"
                  width={447}
                  height={558}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 bg-cream-200/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-cream-100/50 hidden md:block">
                  <p className="text-wineRed-100 font-serif text-base font-medium">
                    {t.experience.openForVisits}
                  </p>
                  <p className="text-deepBrown-100/60 text-sm mt-0.5">{t.experience.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineryExperience;
