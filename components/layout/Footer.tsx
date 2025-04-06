"use client";
import React from "react";
import { Facebook, Instagram, Twitter, Wine, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const _currentYear = new Date().getFullYear();
  const { toast } = useToast();

  const _handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get header height to offset scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;

      // Calculate position to scroll to
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight - 20;

      // Smooth scroll to element
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const _handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} Page`,
      description: `Visit our ${platform} page to see more updates and connect with us!`,
    });
  };

  const _handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;

    if (emailInput?.value) {
      toast({
        title: "Subscription Confirmed",
        description: "Thank you for subscribing to our newsletter!",
      });
      emailInput.value = "";
    } else {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
    }
  };

  const _FooterLink = ({
    sectionId,
    children,
  }: {
    sectionId: string;
    children: React.ReactNode;
  }) => (
    <button
      className="text-cream/80 hover:text-gold cursor-pointer transition-colors text-left"
      onClick={() => _handleScrollToSection(sectionId)}
    >
      {children}
    </button>
  );

  return (
    <footer className="bg-deepBrown-200 text-white-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center mb-4 cursor-pointer"
            >
              <Wine className="w-6 h-6 mr-2 text-gold-100" />
              <span className="text-xl font-playfair font-semibold text-cream-100">
                Kalchev Family Winery
              </span>
            </button>
            <p className="text-cream-100/80 mb-4">
              Premium wines crafted with passion and tradition in Macedonia's
              Thracian Valley since 1932.
            </p>
            <div className="flex space-x-4">
              <button
                className="text-cream-100/80 hover:text-gold-100 transition-colors"
                onClick={() => _handleSocialClick("Facebook")}
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                className="text-cream-100/80 hover:text-gold-100 transition-colors"
                onClick={() => _handleSocialClick("Instagram")}
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                className="text-cream-100/80 hover:text-gold-100 transition-colors"
                onClick={() => _handleSocialClick("Twitter")}
              >
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-cream-200 ">
              Quick Links
            </h3>
            <ul className="space-y-2 ">
              <li className="hover:text-cream-300 transition-colors">
                <_FooterLink sectionId="about">About Us</_FooterLink>
              </li>
              <li className="hover:text-cream-300 transition-colors">
                <_FooterLink sectionId="wines">Our Wines</_FooterLink>
              </li>
              <li className="hover:text-cream-300 transition-colors">
                <_FooterLink sectionId="experience">
                  Winery Experience
                </_FooterLink>
              </li>
              <li className="hover:text-cream-300 transition-colors">
                <_FooterLink sectionId="testimonials">Testimonials</_FooterLink>
              </li>
              <li className="hover:text-cream-300 transition-colors">
                <_FooterLink sectionId="contact">Contact</_FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-cream-200">
              Contact Us
            </h3>
            <address className="text-cream-100/90 not-italic">
              Kalchev Estate Vineyards
              <br />
              15 Grape Road
              <br />
              Bogdanci Valley, Macedonia
              <br />
              <br />
              <a
                href="tel:+35988812345"
                className="hover:text-gold-100 transition-colors"
              >
                +359 888 123 456
              </a>
              <br />
              <a
                href="mailto:info@kalchevwinery.com"
                className="hover:text-gold transition-colors"
              >
                info@kalchevwinery.com
              </a>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-cream-100">
              Newsletter
            </h3>
            <p className="text-cream-100/80 mb-4">
              Subscribe to our newsletter for updates on new wine releases,
              events, and special offers.
            </p>
            <form className="flex" onSubmit={_handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-deepBrown-100/80 text-cream border border-cream-100/30 rounded-l-md focus:outline-none focus:border-gold-100 flex-grow"
              />
              <button
                type="submit"
                className="bg-gold-100 text-white-100 px-4 py-2 rounded-r-md hover:bg-wineRed-100 transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <hr className="border-cream-100/10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream-100/60 text-sm mb-4 md:mb-0">
            &copy; {_currentYear} Kalchev Family Winery. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button
              className="text-cream-100/60 text-sm hover:text-gold-100 transition-colors cursor-pointer"
              onClick={() => {
                toast({
                  title: "Privacy Policy",
                  description:
                    "Our privacy policy outlines how we collect, use, and protect your information.",
                });
              }}
            >
              Privacy Policy
            </button>
            <button
              className="text-cream-100/60 text-sm hover:text-gold-100 transition-colors cursor-pointer"
              onClick={() => {
                toast({
                  title: "Terms of Service",
                  description:
                    "By using our site, you agree to our terms and conditions.",
                });
              }}
            >
              Terms of Service
            </button>
            <button
              className="text-cream-100/60 text-sm hover:text-gold-100 transition-colors cursor-pointer"
              onClick={() => {
                toast({
                  title: "Cookie Policy",
                  description:
                    "We use cookies to enhance your experience on our website.",
                });
              }}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
