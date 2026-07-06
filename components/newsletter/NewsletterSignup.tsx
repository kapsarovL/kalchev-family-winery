"use client";

import React, { useState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

export default function NewsletterSignup() {
  const { t } = useLocale();
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const action = async (formData: FormData) => {
    setIsPending(true);
    try {
      const result = await subscribeToNewsletter(null, formData);
      setState(result);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full">
      {state?.success ? (
        <div className="flex items-center gap-3 text-cream-100 py-3">
          <CheckCircle size={20} className="text-gold-100 flex-shrink-0" />
          <span className="font-inter text-sm">{state.message}</span>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); action(new FormData(e.currentTarget)); }} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            name="email"
            placeholder={t.newsletter.placeholder}
            required
            className="flex-1 px-4 py-3 text-sm bg-white-100/10 border border-cream-100/20 rounded-lg text-cream-100 placeholder:text-cream-100/40 focus:outline-none focus:border-gold-100/60 focus:bg-white-100/15 transition-colors"
            aria-label="Email address for newsletter"
          />
          <button
            type="submit"
            disabled={isPending}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-gold-100 hover:bg-gold-100/90 text-white-100 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {isPending ? t.newsletter.subscribing : (
              <>
                {t.newsletter.subscribe}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
      {state && !state.success && (
        <p className="text-wineRed-100/80 text-xs mt-2">{state.message}</p>
      )}
    </div>
  );
}
