"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/lib/i18n/locale-context";
import { checkoutAction } from "@/lib/checkout";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const { locale } = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await checkoutAction(null, formData);
      if (result.success && result.orderId) {
        dispatch({ type: "CLEAR" });
        router.push(`/order/confirm?id=${result.orderId}`);
      } else {
        setErrors(result.errors as Record<string, string> | null);
      }
    });
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag size={64} className="mx-auto text-deepBrown-100/30 mb-4" strokeWidth={1} />
          <h1 className="text-2xl font-playfair font-bold text-wineRed-100 mb-2">
            Your cart is empty
          </h1>
          <p className="text-deepBrown-100/60 font-inter mb-6">
            Add some wines to your cart before checking out.
          </p>
          <Button
            onClick={() => router.push("/#wines")}
            className="bg-wineRed-100 hover:bg-gold-100 text-white-100"
          >
            Browse Wines
          </Button>
        </div>
      </div>
    );
  }

  const total = state.items.reduce(
    (sum, item) =>
      sum + parseFloat(item.wine.price.replace("€", "").replace(",", ".").trim()) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-deepBrown-100/60 hover:text-deepBrown-100 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-inter text-sm">Back</span>
        </button>

        <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-8">Checkout</h1>

        {errors?._form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm font-inter">
            {errors._form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white-100 rounded-lg p-6 shadow-xs border border-cream-200">
              <h2 className="text-lg font-playfair font-bold text-deepBrown-300 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    required
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.customerName && (
                    <p className="text-red-500 text-xs mt-1 font-inter">{errors.customerName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="customerEmail"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.customerEmail && (
                    <p className="text-red-500 text-xs mt-1 font-inter">{errors.customerEmail}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Phone *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.phone && (
                    <p className="text-red-500 text-xs mt-1 font-inter">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white-100 rounded-lg p-6 shadow-xs border border-cream-200">
              <h2 className="text-lg font-playfair font-bold text-deepBrown-300 mb-4">
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Address Line 1 *
                  </label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    required
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.addressLine1 && (
                    <p className="text-red-500 text-xs mt-1 font-inter">{errors.addressLine1}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="addressLine2"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Address Line 2
                  </label>
                  <input
                    id="addressLine2"
                    name="addressLine2"
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                    >
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      required
                      className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                    />
                    {errors?.city && (
                      <p className="text-red-500 text-xs mt-1 font-inter">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                    >
                      Postal Code *
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      required
                      className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                    />
                    {errors?.postalCode && (
                      <p className="text-red-500 text-xs mt-1 font-inter">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Country *
                  </label>
                  <input
                    id="country"
                    name="country"
                    defaultValue="North Macedonia"
                    required
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.country && (
                    <p className="text-red-500 text-xs mt-1 font-inter">{errors.country}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="deliveryNotes"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    Delivery Notes
                  </label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    rows={3}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100 resize-none"
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white-100 rounded-lg p-6 shadow-xs border border-cream-200 sticky top-4">
              <h2 className="text-lg font-playfair font-bold text-deepBrown-300 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                {state.items.map(({ wine, quantity }) => (
                  <div key={wine.id} className="flex gap-3 items-start">
                    <div className="relative w-10 h-14 shrink-0 bg-cream-100/60 rounded">
                      <Image
                        src={wine.image}
                        alt={wine.translations[locale].name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-deepBrown-300 truncate">
                        {wine.translations[locale].name}
                      </p>
                      <p className="text-xs text-deepBrown-100/60">Qty: {quantity}</p>
                      <p className="text-sm text-gold-100 font-medium">{wine.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "REMOVE", id: wine.id })}
                      className="text-deepBrown-100/40 hover:text-wineRed-100 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="hidden"
                name="items"
                value={JSON.stringify(
                  state.items.map(({ wine, quantity }) => ({
                    wineId: wine.id,
                    wineName: wine.translations[locale].name,
                    winePrice: wine.price,
                    quantity,
                  })),
                )}
              />

              <div className="border-t border-cream-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-deepBrown-100/70">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-deepBrown-100/70">
                  <span>Delivery</span>
                  <span>To be arranged</span>
                </div>
                <div className="flex justify-between font-bold text-deepBrown-300 text-lg border-t border-cream-200 pt-2">
                  <span>Total</span>
                  <span className="text-gold-100">€{total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-xs text-deepBrown-100/50 font-inter mt-3 text-center">
                Payment will be collected upon delivery.
              </p>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-wineRed-100 hover:bg-gold-100 text-white-100 mt-4 transition-colors"
              >
                {isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
