"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center text-white-100">
      <Image
        src="/images/hero-bg.jpg"
        alt="Hero Image"
        fill={true}
        style={{ objectFit: "cover" }}
        className="absolute inset-0 opacity-20"
        sizes="100vw"
        priority
      />
      <div className="bg-img-overlay"></div>
      <div className="flex flex-col max-w-4xl text-center font-inter justify-center text-cream-200 items-center mx-auto px-1 py-24 z-10">
        <small>Welcome to Kalchev Family Winery</small>
        <h1 className="text-6xl font-bold font-playfair text-white-200 mb-4">
          Crafting Exceptional Wine Since 1932
        </h1>
        <p className="text-xl max-w-3xl text-cream-200">
          Experience the essence of Macedonia wine tradition with our artisanal,
          family-crafted wines from the heart of the Bogdanci Valley.
        </p>
        <div className="space-x-4">
          <Button
            variant="default"
            className="mt-4 bg-gold-100 text-white-100 hover:bg-wineRed-100 
        transition-colors duration-300"
          >
            Learn More
          </Button>
          <Button
            variant="outline"
            className="mt-4 bg-transparent text-white-100 hover:bg-wineRed-100
        transition-colors duration-300"
          >
            Book Tasting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
