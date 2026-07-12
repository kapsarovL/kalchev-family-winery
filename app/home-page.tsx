"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import SectionTransition from "@/components/shared/SectionTransition";
import PageTransition from "@/components/shared/PageTransition";

import About from "@/components/about";
const WinePhilosophy = dynamic(() => import("@/components/wine-philosophy"));
const WineGallery = dynamic(() => import("@/components/products"));
const FeaturedWineShowcase = dynamic(() => import("@/components/features/FeaturedWineShowcase"));
const WineryExperience = dynamic(() => import("@/components/experience/WineryExperience"));
const Testimonials = dynamic(() => import("@/components/testimonials/Testimonials"));
const ClubMembership = dynamic(() => import("@/components/membership/WineClubMembership"));
const WineGiftPackages = dynamic(() => import("@/components/packages/WineGiftPackages"));
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";
const CookieConsent = dynamic(() => import("@/components/layout/CookieConsent"));

export default function HomePage() {
  return (
    <PageTransition>
      <motion.div
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <Hero />
        <SectionTransition>
          <WinePhilosophy />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <About />
        </SectionTransition>
        <SectionTransition delay={0.2}>
          <WineGallery />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <FeaturedWineShowcase />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <WineryExperience />
        </SectionTransition>
        <SectionTransition delay={0.2}>
          <Testimonials />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <ClubMembership />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <WineGiftPackages />
        </SectionTransition>
        <SectionTransition delay={0.2}>
          <Contact />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <Footer />
        </SectionTransition>
        <CookieConsent />
      </motion.div>
    </PageTransition>
  );
}
