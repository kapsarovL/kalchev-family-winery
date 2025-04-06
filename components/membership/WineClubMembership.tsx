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

const membershipTiers: MembershipTier[] = [
  {
    id: "basic",
    name: "Basic Membership",
    description: "Enjoy a selection of our finest wines.",
    price: "$29.99",
    billingPeriod: "monthly",
    features: ["Monthly wine delivery", "Exclusive member discounts"],
    recommended: false,
    icon: <GlassWater />,
  },
  {
    id: "premium",
    name: "Premium Membership",
    description: "Get premium wines and exclusive access to events.",
    price: "$49.99",
    billingPeriod: "monthly",
    features: [
      "Monthly premium wine delivery",
      "Access to exclusive events",
      "Personalized wine recommendations",
    ],
    recommended: true,
    icon: <Star />,
  },
  {
    id: "vip",
    name: "VIP Membership",
    description: "The ultimate wine experience with personalized service.",
    price: "$99.99",
    billingPeriod: "monthly",
    features: [
      "Monthly VIP wine delivery",
      "One-on-one consultations",
      "Exclusive VIP events",
    ],
    recommended: false,
    icon: <Gift />,
  },
];

const WineClubMembership = () => {
  const [selectedTier, setSelectedTier] = useState<string>(
    membershipTiers.find((tier) => tier.recommended)?.id ||
      membershipTiers[0].id
  );

  return (
    <section
      className="py-24 mx-auto bg-white-200/50 min-h-screen"
      id="wine-club"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-wineRed-100 mb-2">
            Kalchev Wine Club
          </h2>
          <div className="section-underline mx-auto"></div>
          <p className="text-deepBrown-100/80 max-w-2xl mx-auto mb-4 font-inter">
            Join our exclusive wine club and embark on a journey through our
            finest selections. Receive curated wines delivered to your doorstep
            and enjoy member-only benefits.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-8 mb-12">
            <span className="flex items-center text-deepBrown-100/80">
              <Calendar className="w-5 h-5 mr-2 text-wineRed-100" />
              Cancel Anytime
            </span>
            <span className="flex items-center text-deepBrown-100/80">
              <Gift className="w-5 h-5 mr-2 text-wineRed-100" />
              Perfect for Gifting
            </span>
            <span className="flex items-center text-deepBrown-100/80">
              <Shield className="w-5 h-5 mr-2 text-wineRed-100" />
              Satisfaction Guaranteed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {membershipTiers.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative overflow-hidden bg-cream-100/30 transition-all duration-300 hover:shadow-lg border-2",
                selectedTier === tier.id
                  ? "border-primary/80 shadow-md"
                  : "border-transparent hover:border-primary/30",
                tier.recommended ? "md:scale-105" : ""
              )}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 bg-wineRed-100 text-cream-100 py-1 px-3 text-xs font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-cream-200/30 text-wineRed-100">
                    {tier.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-playfair text-center text-wineRed-100">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-center mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-deepBrown-100">
                    ${tier.price}
                  </span>
                  <span className="text-deepBrown-100/70 ml-1">
                    /{tier.billingPeriod}
                  </span>
                </div>
                <ul className="space-y-3 text-left">
                  {tier.features.map((feature, index) => (
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
                      : "bg-wineRed-200/80 hover:bg-wineRed-100"
                  )}
                >
                  {selectedTier === tier.id ? "Join Now" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-cream-100/30 rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-playfair text-wineRed-200 mb-4">
            Wine Club Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <GlassWater className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">
                  Curated Selections
                </h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">
                  Our winemaker personally selects each bottle to ensure you
                  experience the very best of our vineyard.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <Gift className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">
                  Exclusive Access
                </h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">
                  Members get first access to limited releases, reserve wines,
                  and special vintages before the general public.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">
                  Member Events
                </h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">
                  Join us for members-only tastings, harvest celebrations, and
                  educational events throughout the year.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-wineRed-100 p-2 rounded-full mr-4">
                <Shield className="h-5 w-5 text-cream-200" />
              </div>
              <div>
                <h4 className="font-medium text-deepBrown-100 mb-1">
                  Flexible Membership
                </h4>
                <p className="text-deepBrown-100/80 text-sm font-inter">
                  Skip shipments, change your preferences, or cancel anytime
                  with no penalties or hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-deep-brown/60 max-w-2xl mx-auto">
            By joining the Kalchev Wine Club, you certify that you are at least
            21 years of age and agree to our Terms of Service. All shipments
            require an adult signature upon delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WineClubMembership;
