"use client";

import { useState } from "react";
import { Wine } from "@/data/wines";
import { useCart } from "@/lib/cart-context";

export function useAddToCart(timeoutMs = 2000) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  function addToCart(wine: Wine, quantity = 1) {
    dispatch({ type: "ADD", wine, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), timeoutMs);
  }

  return { addToCart, added };
}
