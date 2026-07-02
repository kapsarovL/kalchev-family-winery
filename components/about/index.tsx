"use client";
import AboutImage from "@/public/images/vranec.png";
import certificateImg from "@/public/images/certificate.webp";
import Image from "next/image";
import { Award, Leaf, Star } from "lucide-react";
import React from "react";
import { useLocale } from "@/lib/i18n/locale-context";

const AboutPage = () => {
  const { t } = useLocale();

  const CREDENTIALS = [
    {
      icon: <Award size={18} className="text-gold-100" />,
      label: t.about.credential1,
      sublabel: t.about.credential1Sub,
    },
    {
      icon: <Star size={18} className="text-gold-100" />,
      label: t.about.credential2,
      sublabel: t.about.credential2Sub,
    },
    {
      icon: <Leaf size={18} className="text-gold-100" />,
      label: t.about.credential3,
      sublabel: t.about.credential3Sub,
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-cream-100">
      <div className="container mx-auto px-4">
        {/* Main two-column row */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Bottle image */}
          <div className="w-full md:w-1/4 flex-shrink-0">
            <div className="relative h-[380px] sm:h-[460px] md:h-[540px] lg:h-[620px] flex justify-center items-center bg-cream-200/40 rounded-xl shadow-inner">
              <Image
                src={AboutImage}
                alt="The Kalchev Family Winery vineyard"
                fill
                sizes="(max-width: 568px) 50vw, 25vw"
                className="object-contain p-6 drop-shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-cream-300 p-2 sm:p-3 rounded shadow-lg">
                <p className="text-wineRed-100 font-playfair font-bold text-base sm:text-lg">
                  {t.about.est}
                </p>
              </div>
            </div>
          </div>

          {/* Story + stats */}
          <div className="w-full md:w-2/3 bg-wineRed-200 px-5 py-8 rounded-lg shadow-md mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gold-100 mb-6">
              {t.about.heading}
            </h2>
            <p className="text-lg text-cream-100/80 mb-4">
              {t.about.p1}
            </p>
            <h3 className="text-2xl font-serif font-bold text-cream-300">
              {t.about.sub1}
            </h3>
            <p className="text-lg text-cream-200/80 mb-4">
              {t.about.p2}
            </p>
            <p className="text-lg text-cream-200/80 mb-4">
              {t.about.p3}
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-cream-300">
                  {t.about.stat1}
                </h3>
                <p className="text-cream-200/70">
                  {t.about.stat1Desc}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Certificates & Awards strip */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-deepBrown-100/10" />
            <p className="text-xs font-inter uppercase tracking-widest text-deepBrown-100/40">
              {t.about.awards}
            </p>
            <div className="h-px flex-1 bg-deepBrown-100/10" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Certificate image */}
            <div className="relative w-full lg:w-72 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border border-cream-200/60 bg-cream-200/30">
              <Image
                src={certificateImg}
                alt="Kalchev Family Winery official certificate"
                width={600}
                height={420}
                sizes="(max-width: 1024px) 90vw, 288px"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gold-100/20 pointer-events-none" />
            </div>

            {/* Credential cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {CREDENTIALS.map(({ icon, label, sublabel }) => (
                <div
                  key={label}
                  className="flex flex-col gap-3 bg-white-100 border border-cream-200/80 rounded-xl px-5 py-5 shadow-sm hover:shadow-md hover:border-gold-100/40 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-cream-200/60 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-playfair font-semibold text-deepBrown-100 text-sm leading-snug">
                      {label}
                    </p>
                    <p className="text-xs text-deepBrown-100/50 font-inter mt-1">
                      {sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
