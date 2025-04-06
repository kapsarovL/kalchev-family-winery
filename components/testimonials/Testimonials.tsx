"use client";
import React from "react";
import { testimonials } from "../../data/testimonials";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-wineRed-100 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            Discover why wine enthusiasts and connoisseurs choose Kalchev Family
            Winery for exceptional Macedonian wines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white-200 p-6 rounded-lg shadow-md border border-cream-100/80 transition-transform hover:-translate-y-1 hover:shadow-lg"
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
                "{testimonial.text}"
              </p>

              <div className="mt-auto">
                <p className="font-semibold text-wineRed-100">
                  {testimonial.name}
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
