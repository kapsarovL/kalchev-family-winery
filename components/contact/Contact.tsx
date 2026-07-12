"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Check } from "lucide-react";
import { Form } from "@/components/form";
import { useLocale } from "@/lib/i18n/locale-context";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { t } = useLocale();

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-cream-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-deepBrown-100 mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-lg text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 sm:gap-12 lg:gap-24">
          <div className="bg-wineRed-200 rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-4 sm:p-6 space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gold-100 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-cream-200 mb-1">{t.contact.location}</h4>
                  <p className="text-cream-200/90">
                    {t.contact.addressLine1}
                    <br />
                    {t.contact.addressLine2}
                    <br />
                    {t.contact.addressLine3}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-gold-100 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-cream-200 mb-1">{t.contact.phone}</h4>
                  <p className="text-cream-200/90">{t.contact.phone1}</p>
                  <p className="text-cream-200/90">{t.contact.phone2}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gold-100 mt-1 mr-3" />
                <div>
                  <h4 className="font-medium text-cream-200 mb-1">{t.contact.email}</h4>
                  <p className="text-cream-200/90">{t.contact.email1}</p>
                  <p className="text-cream-200/90">{t.contact.email2}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-cream-200 mb-2">{t.contact.openingHours}</h4>
                <p className="text-cream-200/90">
                  <span className="font-medium">{t.contact.wineryTastingRoom}:</span>
                  <br />
                  {t.contact.hoursWeekend}
                  <br />
                  {t.contact.hoursClosed}
                </p>
              </div>
            </div>

            <div className="relative min-h-[280px]">
              <Image
                src="/images/contact-info.webp"
                alt="Kalchev Family Winery"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="bg-wineRed-200 p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-2xl font-playfair font-bold text-cream-200 text-start mb-6">
              {t.contact.sendMessage}
            </h3>
            <div className="flex-1">
              <Form className="max-w-none border-0" onSuccess={handleSubmit} />
            </div>
            {formSubmitted && (
              <div className="mt-4 bg-wineRed-100/10 p-4 rounded-md border border-wineRed-100/20 flex items-center">
                <Check className="w-5 h-5 text-wineRed-100 mr-2" />
                <p className="text-wineRed-100">{t.contact.success}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
