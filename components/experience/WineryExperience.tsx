import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, GlassWater, Utensils, Users } from "lucide-react";
import ExperienceImage from "@/public/images/wines3.jpg";
import Image from "next/image";

const WineryExperience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-cream-100/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-wineRed-100 mb-6">
              Experience the Winery
            </h2>
            <p className="text-lg text-deepBrown-100/80 mb-6">
              Visit our family winery in the heart of Macedonia's Bogdanci
              Valley and immerse yourself in a world of fine wines, rich
              traditions, and warm hospitality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <GlassWater className="w-6 h-6 text-gold-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    Wine Tastings
                  </h3>
                  <p className="text-deepBrown-100/70">
                    Guided tastings of our award-winning wines, from traditional
                    Macedonia varieties to international classics.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Users className="w-6 h-6 text-wineRed-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    Vineyard Tours
                  </h3>
                  <p className="text-deepBrown-100/70">
                    Walk through our picturesque vineyards and learn about our
                    sustainable farming practices and unique terroir.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Utensils className="w-6 h-6 text-gold-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    Food Pairings
                  </h3>
                  <p className="text-deepBrown-100/70">
                    Enjoy local delicacies perfectly paired with our wines,
                    showcasing the best of Macedonia's cuisine.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Calendar className="w-6 h-6 text-wineRed-100" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-deepBrown-100 mb-2">
                    Special Events
                  </h3>
                  <p className="text-deepBrown-100/70">
                    From harvest celebrations to themed dinners, our seasonal
                    events offer unique wine experiences.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="bg-wineRed-100 hover:text-white-100 hover:bg-gold-100 transition-colors"
            >
              Book Your Experience
            </Button>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <Image
                src={ExperienceImage}
                alt="Wine tasting experience at Kalchev Family Winery"
                className="rounded-lg w-full object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute -bottom-4 -left-4 bg-cream-200 p-4 rounded shadow-lg hidden md:block">
                <p className="text-wineRed-100 font-serif text-lg font-medium">
                  Open for visits
                </p>
                <p className="text-deepBrown-100/70">Wed-Sun, 10am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineryExperience;
