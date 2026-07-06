"use client";
import React, { useState } from "react";
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
    <section id="contact" className="py-16 md:py-24 bg-cream-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-wineRed-200 mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-lg text-deepBrown-100/80 max-w-2xl mx-auto font-inter">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="flex justify-center items-center w-full flex-col lg:flex-row gap-24">
          <div className=" lg:w-2/3">
            <h3 className="text-2xl font-playfair font-bold text-wineRed-200 mb-6">
              {t.contact.contactInfo}
            </h3>
            <div className="bg-wineRed-200 p-6 rounded-lg shadow-md h-full">
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gold-100 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-cream-300">{t.contact.location}</h4>
                    <p className="text-cream-200/85">
                      Kalchev Estate Vineyards
                      <br />
                      15 Grape Road
                      <br />
                      Bogdanci Valley, Macedonia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gold-100 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-cream-300">{t.contact.phone}</h4>
                    <p className="text-cream-200/85">+359 888 123 456</p>
                    <p className="text-cream-200/85">+359 2 987 6543</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gold-100 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-cream-300">{t.contact.email}</h4>
                    <p className="text-cream-200/85">info@kalchevwinery.com</p>
                    <p className="text-cream-200/85">
                      orders@kalchevwinery.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-cream-300 mb-2">
                  {t.contact.openingHours}
                </h4>
                  <p className="text-cream-200/85">
                  <span className="font-medium">{t.contact.wineryTastingRoom}:</span>
                  <br />
                  {t.contact.hoursWeekend}
                  <br />
                  {t.contact.hoursClosed}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl w-full lg:w-2/5">
            <div className=" flex flex-col items-start justify-between w-full mx-auto p-6 gap-5 lg:w-auto">
              <h3 className="text-2xl font-playfair font-bold text-wineRed-200 text-start items-start flex flex-col mb-6">
                {t.contact.sendMessage}
              </h3>
              <Form onSuccess={handleSubmit} />
            </div>
            {formSubmitted && (
              <div className="mb-6 bg-wineRed-100/10 p-4 rounded-md border border-wineRed-100/20 flex items-center">
                <Check className="w-5 h-5 text-wineRed-100 mr-2" />
                <p className="text-wineRed-100">
                  {t.contact.success}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
