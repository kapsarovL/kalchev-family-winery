"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Wine, wines } from "@/data/wines";

type StoredCartItem = { wineId: number; quantity: number };

type CartState = { items: { wine: Wine; quantity: number }[]; isOpen: boolean };
type CartAction =
  | { type: "ADD"; wine: Wine; quantity: number }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE_QTY"; id: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "HYDRATE"; items: { wine: Wine; quantity: number }[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.wine.id === action.wine.id);
      return {
        ...state,
        isOpen: true,
        items: existing
          ? state.items.map((i) =>
              i.wine.id === action.wine.id ? { ...i, quantity: i.quantity + action.quantity } : i,
            )
          : [...state.items, { wine: action.wine, quantity: action.quantity }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.wine.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        items:
          action.quantity <= 0
            ? state.items.filter((i) => i.wine.id !== action.id)
            : state.items.map((i) =>
                i.wine.id === action.id ? { ...i, quantity: action.quantity } : i,
              ),
      };
    case "CLEAR":
      return { ...state, items: [], isOpen: false };
    case "SET_OPEN":
      return { ...state, isOpen: action.open };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kalchev-cart");
      if (saved) {
        const parsed: StoredCartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const restored = parsed
            .map((item) => {
              const wine = wines.find((w) => w.id === item.wineId);
              return wine ? { wine, quantity: item.quantity } : null;
            })
            .filter((i): i is { wine: Wine; quantity: number } => i !== null);
          dispatch({ type: "HYDRATE", items: restored });
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const stored: StoredCartItem[] = state.items.map((item) => ({
        wineId: item.wine.id,
        quantity: item.quantity,
      }));
      localStorage.setItem("kalchev-cart", JSON.stringify(stored));
    } catch {}
  }, [state.items, hydrated]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}