"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, translations, Translations } from "./translations";

type LocaleContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("kalchev-locale") as Locale | null;
    if (saved === "en" || saved === "mk" || saved === "gr") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("kalchev-locale", l);
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
