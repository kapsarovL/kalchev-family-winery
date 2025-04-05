"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send, Check } from "lucide-react";
import { Form } from "@/components/form";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-brown mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-deep-brown/80 max-w-2xl mx-auto">
            Have questions about our wines, want to schedule a visit, or
            interested in placing an order? We'd love to hear from you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-serif font-bold text-deep-brown mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-wine-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-deep-brown">Location</h4>
                    <p className="text-deep-brown/70">
                      Kalchev Estate Vineyards
                      <br />
                      15 Grape Road
                      <br />
                      Thracian Valley, Bulgaria
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gold mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-deep-brown">Phone</h4>
                    <p className="text-deep-brown/70">+359 888 123 456</p>
                    <p className="text-deep-brown/70">+359 2 987 6543</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-wine-red mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-deep-brown">Email</h4>
                    <p className="text-deep-brown/70">info@kalchevwinery.com</p>
                    <p className="text-deep-brown/70">
                      orders@kalchevwinery.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-deep-brown mb-2">
                  Opening Hours
                </h4>
                <p className="text-deep-brown/70">
                  <span className="font-medium">Winery & Tasting Room:</span>
                  <br />
                  Wednesday - Sunday: 10:00 AM - 6:00 PM
                  <br />
                  Monday - Tuesday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-serif font-bold text-deep-brown mb-6">
                Send Us a Message
              </h3>

              {formSubmitted && (
                <div className="mb-6 bg-wine-red/10 p-4 rounded-md border border-wine-red/20 flex items-center">
                  <Check className="w-5 h-5 text-wine-red mr-2" />
                  <p className="text-wine-red">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
