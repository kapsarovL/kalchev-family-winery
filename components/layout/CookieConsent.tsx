"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLocale } from "@/lib/i18n/locale-context";

const COOKIE_CONSENT_KEY = "kalchev-cookie-consent";

type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const CookieConsent = () => {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "custom") {
      try {
        const saved = JSON.parse(localStorage.getItem("kalchev-cookie-preferences") ?? "{}");
        setPreferences({ ...defaultPreferences, ...saved });
      } catch {
        setPreferences(defaultPreferences);
      }
      return;
    }
    if (stored) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 200px 0px" }
    );

    const footer = document.querySelector("footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);

  const save = (value: string, prefs?: CookiePreferences) => {
    if (prefs) {
      localStorage.setItem("kalchev-cookie-preferences", JSON.stringify(prefs));
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
    setDialogOpen(false);
  };

  const accept = () => {
    const all: CookiePreferences = { essential: true, analytics: true, marketing: true };
    save("accepted", all);
    setPreferences(all);
  };

  const reject = () => {
    save("rejected", defaultPreferences);
    setPreferences(defaultPreferences);
  };

  const saveCustom = () => {
    save("custom", preferences);
  };

  const toggle = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-deepBrown-200 border-cream-100/10 text-cream-100">
          <DialogHeader>
            <DialogTitle className="font-playfair text-lg text-cream-100">
              {t.cookieConsent.dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-cream-100/60 text-xs font-inter leading-relaxed">
              {t.cookieConsent.dialogDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            {(
              [
                { key: "essential" as const, alwaysOn: true },
                { key: "analytics" as const, alwaysOn: false },
                { key: "marketing" as const, alwaysOn: false },
              ] as const
            ).map(({ key, alwaysOn }) => (
              <label
                key={key}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                  key === "essential"
                    ? "border-cream-100/10 bg-cream-100/5 opacity-60"
                    : preferences[key]
                      ? "border-gold-100/30 bg-gold-100/5"
                      : "border-cream-100/10 hover:border-cream-100/20"
                }`}
              >
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={preferences[key]}
                    disabled={alwaysOn}
                    onChange={() => !alwaysOn && toggle(key)}
                    className="sr-only"
                  />
                  <div
                    className={`size-4 rounded flex items-center justify-center transition-colors ${
                      preferences[key]
                        ? "bg-gold-100"
                        : "bg-transparent border border-cream-100/30"
                    } ${alwaysOn ? "border-cream-100/10" : ""}`}
                  >
                    {preferences[key] && <Check size={12} className="text-deepBrown-200" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cream-100 font-inter">
                    {t.cookieConsent[key]}
                    {alwaysOn && (
                      <span className="text-cream-100/40 text-xs ml-1.5 font-normal">
                        (required)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-cream-100/50 font-inter mt-0.5 leading-relaxed">
                    {t.cookieConsent[`${key}Desc` as keyof typeof t.cookieConsent]}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={reject}
              className="text-cream-100/50 hover:text-cream-100 hover:bg-white/5 text-xs h-9 px-4"
            >
              {t.cookieConsent.reject}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-cream-100/20 text-cream-100 hover:bg-white/10 hover:border-cream-100/40 text-xs h-9 px-4"
              >
                Back
              </Button>
              <Button
                onClick={saveCustom}
                className="bg-gold-100/90 hover:bg-gold-100 text-deepBrown-200 text-xs h-9 px-5 font-semibold shadow-lg shadow-gold-100/10"
              >
                {t.cookieConsent.save}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-deepBrown-200/95 backdrop-blur-xl border-t border-cream-100/10 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-5 md:py-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-sm font-semibold text-cream-100 mb-1">
                    {t.cookieConsent.title}
                  </p>
                  <p className="text-cream-100/60 text-xs font-inter leading-relaxed max-w-3xl">
                    {t.cookieConsent.message}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <Button
                    variant="ghost"
                    onClick={reject}
                    className="text-cream-100/50 hover:text-cream-100 hover:bg-white/5 text-xs h-9 px-4"
                  >
                    {t.cookieConsent.reject}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(true);
                    }}
                    className="border-cream-100/20 bg-cream-100/8 text-cream-100 shadow-sm backdrop-blur-sm hover:bg-cream-100/20 hover:border-cream-100/40 active:bg-cream-100/25 text-xs h-9 px-4"
                  >
                    {t.cookieConsent.settings}
                  </Button>
                  <Button
                    onClick={accept}
                    className="bg-gold-100/90 hover:bg-gold-100 text-deepBrown-200 text-xs h-9 px-5 font-semibold shadow-lg shadow-gold-100/10"
                  >
                    {t.cookieConsent.accept}
                  </Button>
                  <button
                    onClick={reject}
                    className="ml-1 text-cream-100/30 hover:text-cream-100/70 transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
