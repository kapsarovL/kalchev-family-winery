"use client";

import React, { createContext, useContext, useState } from "react";
import { Locale, translations, Translations } from "./translations";

type LocaleContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("kalchev-locale") : null;
      if (saved === "en" || saved === "mk" || saved === "gr") return saved;
    } catch {}
    return "en";
  });

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("kalchev-locale", l);
    } catch {}
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
