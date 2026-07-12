"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/locale-context";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { parsePrice } from "@/lib/price";

export default function CartDrawer() {
  const { state, dispatch } = useCart();
  const { locale, t } = useLocale();
  const total = state.items.reduce(
    (sum, item) => sum + parsePrice(item.wine.price) * item.quantity,
    0,
  );

  useEffect(() => {
    if (!state.isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "SET_OPEN", open: false });
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [state.isOpen, dispatch]);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => dispatch({ type: "SET_OPEN", open: false })}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white-100 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
              <h2 id="cart-heading" className="text-xl font-playfair font-bold text-wineRed-100">
                {t.cart.heading} ({state.items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <button
                onClick={() => dispatch({ type: "SET_OPEN", open: false })}
                className="text-deepBrown-100/80 hover:text-deepBrown-100 transition-colors"
                aria-label={t.cart.close}
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-deepBrown-100/50">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-inter">{t.cart.empty}</p>
                </div>
              ) : (
                state.items.map(({ wine, quantity }) => (
                  <div key={wine.id} className="flex gap-3 items-center">
                    <div className="relative w-14 h-20 shrink-0 bg-cream-100/60 rounded">
                      <Image
                        src={wine.image}
                        alt={wine.translations[locale].name}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-deepBrown-300 text-sm truncate">
                        {wine.translations[locale].name}
                      </p>
                      <p className="text-gold-100 text-sm font-medium">{wine.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            dispatch({ type: "UPDATE_QTY", id: wine.id, quantity: quantity - 1 })
                          }
                          className="w-6 h-6 rounded border border-cream-200 flex items-center justify-center text-deepBrown-100 hover:bg-cream-100 transition-colors text-sm"
                          aria-label={`Decrease quantity of ${wine.translations[locale].name}`}
                        >
                          −
                        </button>
                        <span className="text-sm w-4 text-center">{quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({ type: "UPDATE_QTY", id: wine.id, quantity: quantity + 1 })
                          }
                          className="w-6 h-6 rounded border border-cream-200 flex items-center justify-center text-deepBrown-100 hover:bg-cream-100 transition-colors text-sm"
                          aria-label={`Increase quantity of ${wine.translations[locale].name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch({ type: "REMOVE", id: wine.id })}
                      className="text-deepBrown-100/70 hover:text-wineRed-100 transition-colors shrink-0"
                      aria-label={`Remove ${wine.translations[locale].name} from cart`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="px-5 py-4 border-t border-cream-200 space-y-3">
                <div className="flex justify-between items-center font-medium text-deepBrown-300">
                  <span>{t.cart.total}</span>
                  <span className="text-gold-100 text-lg">€{total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={() => dispatch({ type: "SET_OPEN", open: false })}>
                  <Button className="w-full bg-wineRed-100 hover:bg-gold-100 text-white-100 transition-colors">
                    {t.cart.checkout}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <button
                  onClick={() => dispatch({ type: "CLEAR" })}
                  className="w-full text-sm text-deepBrown-100/50 hover:text-wineRed-100 transition-colors"
                  aria-label={t.cart.clear}
                >
                  {t.cart.clear}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
