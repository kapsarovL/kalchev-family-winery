"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" strokeWidth={1.5} />
        <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-2">Order Placed!</h1>
        <p className="text-deepBrown-100/70 font-inter mb-2">Thank you for your order.</p>
        {orderId && (
          <p className="text-deepBrown-100 font-inter text-sm mb-6">
            Order reference: <span className="font-bold text-wineRed-100">#{orderId}</span>
          </p>
        )}
        <p className="text-deepBrown-100/60 font-inter text-sm mb-8 max-w-sm mx-auto">
          We&apos;ll review your order and contact you at the provided phone number or email to
          confirm delivery details and arrange payment upon delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-wineRed-100 hover:bg-gold-100 text-white-100 transition-colors">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
