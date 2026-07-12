"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, GlassWater, Calendar, Gift, Shield, Star } from "lucide-react";
import { cn } from "../../lib/utils";
import { useLocale } from "@/lib/i18n/locale-context";

// Define membership tiers with their features and pricing
interface MembershipTier {
  id: string;
  name: string;
  description: string;
  price: string;
  billingPeriod: "monthly" | "quarterly" | "annually";
  features: string[];
  recommended?: boolean;
  icon: React.ReactNode;
}

const membershipTiers: Omit<MembershipTier, "name" | "description" | "features">[] = [
  {
    id: "basic",
    price: "$29.99",
    billingPeriod: "monthly",
    recommended: false,
    icon: <GlassWater />,
  },
  {
    id: "premium",
    price: "$49.99",
    billingPeriod: "monthly",
    recommended: true,
    icon: <Star />,
  },
  {
    id: "vip",
    price: "$99.99",
    billingPeriod: "monthly",
    recommended: false,
    icon: <Gift />,
  },
];

const WineClubMembership = () => {
  const { t } = useLocale();
  const [selectedTier, setSelectedTier] = useState<string>(
    membershipTiers.find((tier) => tier.recommended)?.id || membershipTiers[0].id,
  );

  const tierContent = (tierId: string) => {
    const map: Record<string, { name: string; description: string; features: string[] }> = {
      basic: {
        name: t.club.tier1Name,
        description: t.club.tier1Desc,
        features: [t.club.tier1Feature1, t.club.tier1Feature2],
      },
      premium: {
        name: t.club.tier2Name,
        description: t.club.tier2Desc,
        features: [t.club.tier2Feature1, t.club.tier2Feature2, t.club.tier2Feature3],
      },
      vip: {
        name: t.club.tier3Name,
        description: t.club.tier3Desc,
        features: [t.club.tier3Feature1, t.club.tier3Feature2, t.club.tier3Feature3],
      },
    };
    return map[tierId];
  };

  return (
    <section className="py-20 md:py-32 mx-auto bg-white-200/50 min-h-screen" id="wine-club">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-2">
            {t.club.heading}
          </h2>
          <div className="section-underline mx-auto"></div>
          <p className="text-deepBrown-100/80 max-w-2xl mx-auto mb-4 font-inter">
            {t.club.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8 sm:mt-10 mb-10 sm:mb-14">
            <span className="flex items-center text-deepBrown-100/80">
              <Calendar className="w-5 h-5 mr-2 text-wineRed-100" />
              {t.club.cancelAnytime}
            </span>
            <span className="flex items-center text-deepBrown-100/80">
              <Gift className="w-5 h-5 mr-2 text-wineRed-100" />
              {t.club.perfectForGifting}
            </span>
            <span className="flex items-center text-deepBrown-100/80">
              <Shield className="w-5 h-5 mr-2 text-wineRed-100" />
              {t.club.satisfactionGuaranteed}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {membershipTiers.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative overflow-hidden bg-cream-100/30 transition-all duration-300 hover:shadow-lg border-2",
                selectedTier === tier.id
                  ? "border-primary/80 shadow-md"
                  : "border-transparent hover:border-primary/30",
                tier.recommended ? "md:scale-105" : "",
              )}
              role="radio"
              aria-checked={selectedTier === tier.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedTier(tier.id);
              }}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 bg-wineRed-100 text-cream-100 py-1 px-3 text-xs font-medium">
                  {t.club.mostPopular}
                </div>
              )}
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-cream-200/30 text-wineRed-100">
                    {tier.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-playfair text-center text-wineRed-100">
                  {tierContent(tier.id).name}
                </CardTitle>
                <CardDescription className="text-center mt-2">
                  {tierContent(tier.id).description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <div className="mb-8">
                  <span className="text-4xl font-bold text-deepBrown-100">{tier.price}</span>
                  <span className="text-deepBrown-100/70 ml-1">/{tier.billingPeriod}</span>
                </div>
                <ul className="space-y-4 text-left">
                  {tierContent(tier.id).features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                      <span className="text-deepBrown-100/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className={cn(
                    "w-full",
                    selectedTier === tier.id
                      ? "bg-wineRed-200 hover:bg-wineRed-100"
                      : "bg-wineRed-200/80 hover:bg-wineRed-100",
                  )}
                >
                  {selectedTier === tier.id ? t.club.joinNow : t.club.selectPlan}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-cream-100/30 rounded-xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto mt-12 sm:mt-16">
          <h3 className="text-2xl font-playfair text-wineRed-200 mb-8">{t.club.benefitsHeading}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <GlassWater className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">{t.club.benefit1Title}</h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">{t.club.benefit1Desc}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <Gift className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">{t.club.benefit2Title}</h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">{t.club.benefit2Desc}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">{t.club.benefit3Title}</h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">{t.club.benefit3Desc}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <Shield className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">{t.club.benefit4Title}</h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">{t.club.benefit4Desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-deep-brown/60 max-w-2xl mx-auto">{t.club.disclaimer}</p>
        </div>
      </div>
    </section>
  );
};

export default WineClubMembership;
