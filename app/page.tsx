"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import About from "@/components/about";
import WinePhilosophy from "@/components/wine-philosophy";
import WineGallery from "@/components/products";
import { useIsMobile } from "@/hooks/use-mobile";
import SectionTransition from "@/components/shared/SectionTransition";
import PageTransition from "@/components/shared/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <motion.div
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <Hero />
        <SectionTransition>
          <About />
        </SectionTransition>
        <SectionTransition>
          <WinePhilosophy />
        </SectionTransition>
        <SectionTransition>
          <WineGallery />
        </SectionTransition>
      </motion.div>
    </PageTransition>
  );
}
