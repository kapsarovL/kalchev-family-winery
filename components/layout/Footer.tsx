"use client";
import React from "react";
import { Wine, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useToast } from "@/hooks/use-toast";
import NewsletterSignup from "@/components/newsletter/NewsletterSignup";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

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
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16">
            <div className="flex-shrink-0 max-w-sm">
              <p className="text-xs font-inter uppercase tracking-widest text-gold-100 mb-1">Stay in the loop</p>
              <h2 className="font-playfair text-2xl font-bold text-cream-100 leading-snug">
                Stories from the vineyard, straight to your inbox
              </h2>
            </div>
            <div className="flex-1 w-full">
              <NewsletterSignup />
              <p className="text-cream-100/30 text-xs mt-3 font-inter">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 mb-4 cursor-pointer group"
            >
              <Wine className="w-5 h-5 text-gold-100" />
              <span className="font-playfair text-lg font-bold text-cream-100 group-hover:text-gold-100 transition-colors">
                Kalchev Family Winery
              </span>
            </button>
            <p className="text-cream-100/60 text-sm font-inter leading-relaxed mb-6">
              Premium wines crafted with passion and tradition in Macedonia's
              Bogdanci Valley since 1932.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebook size={17} />, label: "Facebook" },
                { icon: <FaInstagram size={17} />, label: "Instagram" },
                { icon: <FaXTwitter size={17} />, label: "X / Twitter" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  onClick={() => toast({ title: label, description: `Follow us on ${label} for the latest updates.` })}
                  className="w-8 h-8 rounded-full border border-cream-100/20 flex items-center justify-center text-cream-100/50 hover:text-gold-100 hover:border-gold-100/50 transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <SectionHeading>Explore</SectionHeading>
            <nav className="flex flex-col gap-2.5">
              <FooterLink sectionId="about">About Us</FooterLink>
              <FooterLink sectionId="wines">Our Wines</FooterLink>
              <FooterLink sectionId="experience">Winery Experience</FooterLink>
              <FooterLink sectionId="testimonials">Testimonials</FooterLink>
              <FooterLink sectionId="wine-club">Wine Club</FooterLink>
              <FooterLink sectionId="contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <SectionHeading>Find Us</SectionHeading>
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
            <SectionHeading>Opening Hours</SectionHeading>
            <dl className="space-y-2 text-sm font-inter">
              {[
                { day: "Mon – Fri", hours: "09:00 – 18:00" },
                { day: "Saturday", hours: "10:00 – 20:00" },
                { day: "Sunday", hours: "11:00 – 17:00" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="text-cream-100/40">{day}</dt>
                  <dd className="text-cream-100/70">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-100/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream-100/30 text-xs font-inter">
            © {currentYear} Kalchev Family Winery. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((label) => (
              <button
                key={label}
                onClick={() => toast({ title: label, description: `Our ${label.toLowerCase()} outlines your rights and our responsibilities.` })}
                className="text-cream-100/30 hover:text-cream-100/60 text-xs font-inter transition-colors"
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
