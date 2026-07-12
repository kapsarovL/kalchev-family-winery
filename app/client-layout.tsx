"use client";

import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import type { Locale } from "@/lib/i18n/translations";

interface ClientLayoutProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function ClientLayout({ children, initialLocale }: ClientLayoutProps) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <CartProvider>
        <main id="main-content" suppressHydrationWarning>
          {children}
        </main>
        <CartDrawer />
        <ScrollToTop />
        <Toaster />
      </CartProvider>
    </LocaleProvider>
  );
}
