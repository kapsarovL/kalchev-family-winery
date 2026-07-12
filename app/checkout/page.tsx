"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/lib/i18n/locale-context";
import { checkoutAction } from "@/lib/checkout";
import { parsePrice } from "@/lib/price";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const { locale, t } = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const c = t.checkout;

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
            {c.emptyCartTitle}
          </h1>
          <p className="text-deepBrown-100/60 font-inter mb-6">{c.emptyCartDesc}</p>
          <Button
            onClick={() => router.push("/#wines")}
            className="bg-wineRed-100 hover:bg-gold-100 text-white-100"
          >
            {c.browseWines}
          </Button>
        </div>
      </div>
    );
  }

  const total = state.items.reduce(
    (sum, item) => sum + parsePrice(item.wine.price) * item.quantity,
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
          <span className="font-inter text-sm">{c.back}</span>
        </button>

        <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-8">{c.orderSummary}</h1>

        {errors?._form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm font-inter">
            {errors._form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white-100 rounded-lg p-6 shadow-xs border border-cream-200">
              <h2 className="text-lg font-playfair font-bold text-deepBrown-300 mb-4">
                {c.contactInfo}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.name} *
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    required
                    aria-invalid={!!errors?.customerName}
                    aria-describedby={errors?.customerName ? "customerName-error" : undefined}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.customerName && (
                    <p id="customerName-error" className="text-red-500 text-xs mt-1 font-inter">
                      {errors.customerName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="customerEmail"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.email} *
                  </label>
                  <input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    aria-invalid={!!errors?.customerEmail}
                    aria-describedby={errors?.customerEmail ? "customerEmail-error" : undefined}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.customerEmail && (
                    <p id="customerEmail-error" className="text-red-500 text-xs mt-1 font-inter">
                      {errors.customerEmail}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.phone} *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    aria-invalid={!!errors?.phone}
                    aria-describedby={errors?.phone ? "phone-error" : undefined}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.phone && (
                    <p id="phone-error" className="text-red-500 text-xs mt-1 font-inter">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white-100 rounded-lg p-6 shadow-xs border border-cream-200">
              <h2 className="text-lg font-playfair font-bold text-deepBrown-300 mb-4">
                {c.deliveryAddress}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.address1} *
                  </label>
                  <input
                    id="addressLine1"
                    name="addressLine1"
                    required
                    aria-invalid={!!errors?.addressLine1}
                    aria-describedby={errors?.addressLine1 ? "addressLine1-error" : undefined}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.addressLine1 && (
                    <p id="addressLine1-error" className="text-red-500 text-xs mt-1 font-inter">
                      {errors.addressLine1}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="addressLine2"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.address2}
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
                      {c.city} *
                    </label>
                    <input
                      id="city"
                      name="city"
                      required
                      aria-invalid={!!errors?.city}
                      aria-describedby={errors?.city ? "city-error" : undefined}
                      className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                    />
                    {errors?.city && (
                      <p id="city-error" className="text-red-500 text-xs mt-1 font-inter">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                    >
                      {c.postalCode} *
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      required
                      aria-invalid={!!errors?.postalCode}
                      aria-describedby={errors?.postalCode ? "postalCode-error" : undefined}
                      className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                    />
                    {errors?.postalCode && (
                      <p id="postalCode-error" className="text-red-500 text-xs mt-1 font-inter">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.country} *
                  </label>
                  <input
                    id="country"
                    name="country"
                    defaultValue="North Macedonia"
                    required
                    aria-invalid={!!errors?.country}
                    aria-describedby={errors?.country ? "country-error" : undefined}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100"
                  />
                  {errors?.country && (
                    <p id="country-error" className="text-red-500 text-xs mt-1 font-inter">
                      {errors.country}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="deliveryNotes"
                    className="block text-sm font-inter font-medium text-deepBrown-100 mb-1"
                  >
                    {c.deliveryNotes}
                  </label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    rows={3}
                    className="w-full px-3 py-2 border border-cream-200 rounded-md font-inter text-sm focus:outline-hidden focus:ring-2 focus:ring-wineRed-100/30 focus:border-wineRed-100 bg-white-100 resize-none"
                    placeholder={c.deliveryPlaceholder}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white-100 rounded-lg p-6 shadow-xs border border-cream-200 sticky top-4">
              <h2 className="text-lg font-playfair font-bold text-deepBrown-300 mb-4">
                {c.orderSummary}
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
                      aria-label={`Remove ${wine.translations[locale].name} from order`}
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
                  <span>{c.subtotal}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-deepBrown-100/70">
                  <span>{c.delivery}</span>
                  <span>{c.deliveryToArranged}</span>
                </div>
                <div className="flex justify-between font-bold text-deepBrown-300 text-lg border-t border-cream-200 pt-2">
                  <span>{c.totalLabel}</span>
                  <span className="text-gold-100">€{total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-xs text-deepBrown-100/50 font-inter mt-3 text-center">
                {c.paymentNote}
              </p>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-wineRed-100 hover:bg-gold-100 text-white-100 mt-4 transition-colors"
              >
                {isPending ? c.placingOrder : c.placeOrder}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
