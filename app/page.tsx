"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import About from "@/components/about";
import WinePhilosophy from "@/components/wine-philosophy";
import WineGallery from "@/components/products";
import FeaturedWineShowcase from "@/components/features/FeaturedWineShowcase";
import WineryExperience from "@/components/experience/WineryExperience";
import Testimonials from "@/components/testimonials/Testimonials";
import ClubMembership from "@/components/membership/WineClubMembership";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";
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
        <SectionTransition delay={0.2}>
          <Contact />
        </SectionTransition>
        <SectionTransition delay={0.1}>
          <Footer />
        </SectionTransition>
      </motion.div>
    </PageTransition>
  );
}
