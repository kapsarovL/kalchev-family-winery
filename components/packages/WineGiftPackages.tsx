"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Truck } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import packageImg from "@/public/images/package-3.webp";

const WineGiftPackages = () => {
  const { t } = useLocale();
  const p = t.packages;

  return (
    <section
      id="gift-packages"
      className="relative overflow-hidden bg-linear-to-b from-cream-100/40 to-cream-200/20 py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-2">
            {p.heading}
          </h2>
          <div className="section-underline mx-auto" />
          <p className="text-deepBrown-100/80 max-w-2xl mx-auto mt-4 font-inter">{p.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
          <div className="relative aspect-square max-w-lg w-full mt-6 md:mt-12">
            <div className="absolute inset-0 bg-linear-to-br from-wineRed-100/10 to-gold-100/10 rounded-3xl" />
            <Image
              src={packageImg}
              alt="Macedonian wine gift package by Kalchev Family Winery — premium Vranec and Temjanika in handcrafted wooden box"
              fill
              priority
              className="object-contain p-4 drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-10 max-w-xl lg:ml-auto mx-auto mt-6 md:mt-12 text-center lg:text-left">
            <div className="space-y-4 mb-10">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-deepBrown-100">
                {p.packageName}
              </h3>
              <p className="text-deepBrown-100/80 font-inter leading-relaxed">{p.packageDesc}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-playfair font-semibold text-wineRed-100">{p.includes}</h4>
              <ul className="space-y-3">
                {p.items.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-deepBrown-100/80 font-inter justify-center lg:justify-start"
                  >
                    <span className="mt-1.5 size-2 rounded-full bg-gold-100 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-3xl font-bold text-wineRed-100 font-playfair">{p.price}</div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-wineRed-200 hover:bg-wineRed-100 text-cream-100 px-10 py-6 text-base">
                <Gift className="size-5 mr-2" />
                {p.cta}
              </Button>
              <Button
                variant="outline"
                className="border-wineRed-100 text-wineRed-100 hover:bg-wineRed-100 hover:text-cream-100 px-10 py-6 text-base"
              >
                <Heart className="size-5 mr-2" />
                {p.ctaWishlist}
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-cream-200 justify-center lg:justify-start">
              <span className="flex items-center gap-2 text-sm text-deepBrown-100/80 font-inter">
                <Truck className="size-4 text-gold-100" />
                {p.freeShipping}
              </span>
              <span className="flex items-center gap-2 text-sm text-deepBrown-100/80 font-inter">
                <Gift className="size-4 text-gold-100" />
                {p.giftWrap}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineGiftPackages;
