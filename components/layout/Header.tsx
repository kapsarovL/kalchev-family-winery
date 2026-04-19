"use client";

import React, { useState } from "react";
import { Menu, X, Calendar, ShoppingCart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useActiveSection } from "@/hooks/use-active-section";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/lib/i18n/locale-context";

const NAV_SECTIONS = ["about", "wines", "experience", "testimonials", "wine-club", "contact"];

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const activeSection = useActiveSection(NAV_SECTIONS);
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const cartCount = cartState.items.reduce((s, i) => s + i.quantity, 0);
  const { locale, setLocale, t } = useLocale();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (mobileMenuOpen) setMobileMenuOpen(false);

      setTimeout(
        () => {
          const headerHeight = document.querySelector("header")?.offsetHeight || 0;
          const offsetPosition =
            element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        },
        mobileMenuOpen ? 300 : 0
      );
    }
  };

  const handleBookTasting = () => {
    toast({
      title: "Booking Request Received",
      description:
        "Thank you for your interest! A representative will contact you shortly to confirm your tasting.",
    });
  };

  const NavLink = ({
    sectionId,
    children,
  }: {
    sectionId: string;
    children: React.ReactNode;
  }) => {
    const isActive = activeSection === sectionId;
    return (
      <button
        className={`relative transition-colors cursor-pointer text-left pb-0.5 ${
          isActive ? "text-wineRed-100 font-medium" : "text-deepBrown-100/70 hover:text-wineRed-100"
        }`}
        onClick={() => handleScrollToSection(sectionId)}
      >
        {children}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-wineRed-100 rounded-full"
          />
        )}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white-100/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="text-2xl font-serif text-gold-100 font-bold cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Kalchev Family Winery
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <motion.nav
            className="hidden md:flex space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            <NavLink sectionId="about">{t.nav.about}</NavLink>
            <NavLink sectionId="wines">{t.nav.wines}</NavLink>
            <NavLink sectionId="experience">{t.nav.experience}</NavLink>
            <NavLink sectionId="testimonials">{t.nav.testimonials}</NavLink>
            <NavLink sectionId="wine-club">{t.nav.wineClub}</NavLink>
            <NavLink sectionId="contact">{t.nav.contact}</NavLink>
          </motion.nav>
        )}

        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => setLocale(locale === "en" ? "mk" : "en")}
            className="text-xs font-medium border border-deepBrown-100/30 rounded px-2 py-1 text-deepBrown-100/70 hover:border-wineRed-100 hover:text-wineRed-100 transition-colors"
            aria-label="Switch language"
          >
            {locale === "en" ? "МК" : "EN"}
          </button>
          <button
            onClick={() => cartDispatch({ type: "SET_OPEN", open: true })}
            className="relative text-deepBrown-100/70 hover:text-wineRed-100 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-wineRed-100 text-white-100 text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
          <Button
            variant="default"
            size="sm"
            className="bg-gold-100 text-white-100 hover:bg-wineRed-100 transition-colors duration-300"
            onClick={handleBookTasting}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {t.nav.bookTasting}
          </Button>
        </motion.div>

        {/* Mobile menu button */}
        {isMobile && (
          <button onClick={toggleMobileMenu} className="md:hidden text-deepBrown-100">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white-100/95 backdrop-blur-sm border-t border-cream-200 px-4 py-4 flex flex-col gap-4"
        >
          {(["about","wines","experience","testimonials","wine-club","contact"] as const).map((id) => {
            const label: Record<string, string> = {
              about: t.nav.about, wines: t.nav.wines, experience: t.nav.experience,
              testimonials: t.nav.testimonials, "wine-club": t.nav.wineClub, contact: t.nav.contact,
            };
            return (
              <button
                key={id}
                className={`text-left transition-colors ${
                  activeSection === id ? "text-wineRed-100 font-medium" : "text-deepBrown-100/70 hover:text-wineRed-100"
                }`}
                onClick={() => handleScrollToSection(id)}
              >
                {label[id]}
              </button>
            );
          })}
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => setLocale(locale === "en" ? "mk" : "en")}
              className="text-xs font-medium border border-deepBrown-100/30 rounded px-2 py-1 text-deepBrown-100/70 hover:border-wineRed-100 hover:text-wineRed-100 transition-colors"
            >
              {locale === "en" ? "МК" : "EN"}
            </button>
            <Button
              size="sm"
              className="bg-gold-100 text-white-100 hover:bg-wineRed-100 transition-colors flex-1"
              onClick={handleBookTasting}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t.nav.bookTasting}
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
