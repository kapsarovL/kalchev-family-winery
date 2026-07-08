"use client";
import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/public/images/logo.webp";
import { useToast } from "@/hooks/use-toast";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";
import { metaData } from "@/config/site";
import { useLocale } from "@/lib/i18n/locale-context";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { toast } = useToast();
  const { t } = useLocale();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = document.querySelector("header")?.offsetHeight ?? 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset - 20, behavior: "smooth" });
  };

  const FooterLink = ({ sectionId, children }: { sectionId: string; children: React.ReactNode }) => (
    <button
      onClick={() => scrollTo(sectionId)}
      className="text-cream-100/60 hover:text-gold-100 transition-colors text-left text-sm font-inter leading-relaxed"
    >
      {children}
    </button>
  );

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-5">
      <h3 className="font-playfair font-semibold text-base tracking-wide text-cream-100 uppercase">
        {children}
      </h3>
      <div className="mt-1.5 h-px w-8 bg-gold-100/70" />
    </div>
  );

  return (
    <footer className="bg-deepBrown-200 text-white-100">

      {/* Newsletter band */}
      <div className="border-b border-cream-100/10">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16">
            <div className="flex-shrink-0 max-w-sm">
              <p className="text-xs font-inter uppercase tracking-widest text-gold-100 mb-1">{t.newsletter.stayInLoop}</p>
              <h2 className="font-playfair text-2xl font-bold text-cream-100 leading-snug">
                {t.newsletter.heading}
              </h2>
            </div>
            <div className="flex-1 w-full">
              <NewsletterSignup />
              <p className="text-cream-100/30 text-xs mt-3 font-inter">
                {t.newsletter.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 mb-4 cursor-pointer group"
            aria-label="Scroll to top"
          >
              <Image src={logo} alt="Kalchev Family Winery" width={418} height={596} className="h-9 w-auto object-contain brightness-0 invert" />
              <span className="font-playfair text-lg font-bold text-cream-100 group-hover:text-gold-100 transition-colors">
                Kalchev Family Winery
              </span>
            </button>
            <p className="text-cream-100/60 text-sm font-inter leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-4">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, label: "Facebook", href: metaData.links.facebook },
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, label: "Instagram", href: metaData.links.instagram },
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X / Twitter", href: metaData.links.twitter },
                { icon: <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, label: "LinkedIn", href: metaData.links.linkedin },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-cream-100/20 flex items-center justify-center text-cream-100/50 hover:text-gold-100 hover:border-gold-100/50 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <SectionHeading>{t.footer.explore}</SectionHeading>
            <nav className="flex flex-col gap-2.5">
              <FooterLink sectionId="about">{t.footer.aboutUs}</FooterLink>
              <FooterLink sectionId="wines">{t.footer.ourWines}</FooterLink>
              <FooterLink sectionId="experience">{t.footer.wineryExperience}</FooterLink>
              <FooterLink sectionId="testimonials">{t.footer.testimonials}</FooterLink>
              <FooterLink sectionId="wine-club">{t.footer.wineClub}</FooterLink>
              <FooterLink sectionId="gift-packages">{t.footer.giftPackages}</FooterLink>
              <FooterLink sectionId="contact">{t.footer.contact}</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <SectionHeading>{t.footer.findUs}</SectionHeading>
            <address className="not-italic space-y-3">
              <div className="flex gap-2.5 items-start text-sm text-cream-100/60 font-inter">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gold-100/60" />
                <span>15 Grape Road, Bogdanci Valley, Macedonia</span>
              </div>
              <div className="flex gap-2.5 items-center text-sm font-inter">
                <Phone size={14} className="flex-shrink-0 text-gold-100/60" />
                <a href="tel:+38975123456" className="text-cream-100/60 hover:text-gold-100 transition-colors">
                  +389 75 123 456
                </a>
              </div>
              <div className="flex gap-2.5 items-center text-sm font-inter">
                <Mail size={14} className="flex-shrink-0 text-gold-100/60" />
                <a href="mailto:info@kalchevwinery.com" className="text-cream-100/60 hover:text-gold-100 transition-colors">
                  info@kalchevwinery.com
                </a>
              </div>
            </address>
          </div>

          {/* Opening hours */}
          <div>
            <SectionHeading>{t.footer.openingHours}</SectionHeading>
            <dl className="space-y-2 text-sm font-inter">
              {[
                { day: t.footer.monFri, hours: "09:00 \u2013 18:00" },
                { day: t.footer.saturday, hours: "10:00 \u2013 20:00" },
                { day: t.footer.sunday, hours: "11:00 \u2013 17:00" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="text-cream-100/70">{day}</dt>
                  <dd className="text-cream-100/85">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-100/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream-100/60 text-xs font-inter">
            © {currentYear} Kalchev Family Winery. {t.footer.rights}
          </p>
          <div className="flex gap-5">
            {[t.footer.privacy, t.footer.terms, t.footer.cookie].map((label) => (
              <button
                key={label}
                onClick={() => toast({ title: label, description: `Our ${label.toLowerCase()} outlines your rights and our responsibilities.` })}
                className="text-cream-100/60 hover:text-cream-100/80 text-xs font-inter transition-colors"
                aria-label={`View ${label}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
