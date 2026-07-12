"use client";
import backgroundImage from "@/public/images/about-background.avif";

import Image from "next/image";

import { useLocale } from "@/lib/i18n/locale-context";

const AboutPage = () => {
  const { t } = useLocale();

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden isolate">
      <Image
        src={backgroundImage}
        alt="Background image of the Kalchev Family Winery vineyard"
        fill
        className="absolute inset-0 object-cover w-full h-full -z-0"
      />
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:max-w-2/3 flex flex-col items-start justify-start text-start left-0 py-6 sm:py-8 px-4 sm:px-6 rounded-lg shadow-md bg-deepBrown-200/60 backdrop-blur-xs">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-cream-100 mb-6">
              {t.about.heading}
            </h2>
            <p className="text-lg text-cream-100/90 mb-4">{t.about.p1}</p>
            <h3 className="text-2xl font-serif font-bold text-gold-100">{t.about.sub1}</h3>
            <p className="text-lg text-cream-100/90 mb-4">{t.about.p2}</p>
            <p className="text-lg text-cream-100/90 mb-4">{t.about.p3}</p>
            <div className="mt-8 flex flex-wrap gap-6 sm:gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-gold-100">{t.about.stat1}</h3>
                <p className="text-cream-100/80">{t.about.stat1Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
