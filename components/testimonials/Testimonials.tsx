"use client";
import React from "react";
import Image from "next/image";
import { testimonials } from "../../data/testimonials";
import { Star } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import bgSection from "@/public/images/background-section.webp";

const Testimonials = () => {
  const { locale, t } = useLocale();
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-12 md:py-24"
      style={{ backgroundColor: "#fdf8f0" }}
    >
      <Image
        src={bgSection}
        alt=""
        className="absolute z-10 hidden md:block"
        style={{ left: 0, top: 0, width: "auto", height: "auto", maxWidth: "none" }}
        width={667}
        height={374}
        priority={false}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-wineRed-100 mb-4">
            {t.testimonials.heading}
          </h2>
          <p className="text-lg text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white-200/40 backdrop-blur-md p-6 rounded-lg shadow-md border border-cream-100/50 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                {/* Display rating stars */}
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-gold-100 fill-gold-100"
                          : "text-cream-100/60"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-deepBrown-100/60">
                  {testimonial.rating}.0
                </span>
              </div>

              <p className="text-deepBrown-100/80 mb-4 italic">
                &ldquo;{testimonial.translations[locale].text}&rdquo;
              </p>

              <div className="mt-auto">
                <p className="font-semibold text-wineRed-100">
                  {testimonial.translations[locale].name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
