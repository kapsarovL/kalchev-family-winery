"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";

const Hero = () => {
  const { t } = useLocale();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen max-h-[70vh] md:max-h-screen w-full flex items-center justify-center text-white-100 overflow-hidden">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/images/hero-mobile.avif"
        />
        <source
          media="(max-width: 1024px)"
          srcSet="/images/hero-tablet.avif"
        />
        <img
          src="/images/hero-background.avif"
          alt=""
          className="absolute inset-0 size-full object-cover"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.06)]" />
      <div className="flex flex-col max-w-3xl text-center font-inter justify-center text-cream-200 items-center mx-auto px-4 mb-10 md:mb-32 z-10">
        <small className="font-semibold text-xl text-wineRed-100">
          {t.hero.smallTitle}
        </small>
        <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white-200 mb-4">
          {t.hero.heading}
        </h1>
        <p className="text-lg md:text-xl max-w-xl text-cream-200">
          {t.hero.paragraph}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          <Button
            variant="default"
            className="bg-gold-100 text-white-100 hover:bg-wineRed-100 transition-colors duration-300"
            onClick={() => scrollTo("wines")}
          >
            {t.hero.cta1}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white-100 hover:bg-wineRed-100 hover:text-cream-100 hover:border-wineRed-100 transition-colors duration-300"
            onClick={() => scrollTo("contact")}
          >
            {t.hero.cta2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
