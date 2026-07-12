"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

const Hero = () => {
  const { t } = useLocale();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-screen max-h-[60vh] sm:max-h-[70vh] md:max-h-screen w-full flex items-center justify-center text-white-100 overflow-hidden">
      <picture className="absolute inset-0 size-full">
        <source
          media="(max-width: 640px)"
          srcSet="/images/hero-mobile-sm.avif 500w, /images/hero-mobile.avif 750w"
          sizes="100vw"
          type="image/avif"
        />
        <source
          media="(max-width: 1024px)"
          srcSet="/images/hero-tablet-sm.avif 900w, /images/hero-tablet.avif 1200w"
          sizes="100vw"
          type="image/avif"
        />
        <img
          src="/images/hero-background.avif"
          alt="Kalchev Family Winery — Macedonian winery in Bogdanci valley"
          className="absolute inset-0 size-full object-cover"
          fetchPriority="high"
          width="1672"
          height="941"
        />
      </picture>
      <div className="absolute inset-0 bg-black/40" />
      <div className="flex flex-col max-w-3xl text-center font-inter justify-center text-white items-center mx-auto px-4 mb-10 md:mb-32 z-10">
        <small className="font-semibold text-xl sm:text-2xl md:text-3xl text-gold-100">
          {t.hero.smallTitle}
        </small>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-playfair text-white mb-4">
          {t.hero.heading}
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-xl text-white/90">{t.hero.paragraph}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-gold-100 text-white-100 hover:bg-wineRed-100 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-wineRed-100/40 transition-all duration-300 px-8 py-3 text-base"
            onClick={() => scrollTo("wines")}
          >
            {t.hero.cta1}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-wineRed-100 text-white shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-wineRed-100/40 transition-all duration-300 px-8 py-3 text-base"
            onClick={() => scrollTo("contact")}
          >
            <Calendar data-icon="inline-start" />
            {t.hero.cta2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
