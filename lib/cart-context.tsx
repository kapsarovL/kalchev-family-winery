"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { z } from "zod";
import { Wine } from "@/data/wines";

export type CartItem = { wine: Wine; quantity: number };

const cartItemSchema = z.object({
  wine: z.object({
    id: z.number(),
    price: z.string(),
    image: z.string(),
    translations: z.record(z.object({
      name: z.string(),
      description: z.string(),
      type: z.string(),
    })),
  }),
  quantity: z.number(),
});

type CartState = { items: CartItem[]; isOpen: boolean };
type CartAction =
  | { type: "ADD"; wine: Wine; quantity: number }
  | { type: "REMOVE"; id: number }
  | { type: "UPDATE_QTY"; id: number; quantity: number }
  | { type: "CLEAR" }
  | { type: "SET_OPEN"; open: boolean }
  | { type: "HYDRATE"; items: CartItem[] };

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
              i.wine.id === action.wine.id ? { ...i, quantity: i.quantity + action.quantity } : i
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
                i.wine.id === action.id ? { ...i, quantity: action.quantity } : i
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

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kalchev-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((item: unknown) => cartItemSchema.safeParse(item).success);
          dispatch({ type: "HYDRATE", items: valid as CartItem[] });
        }
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("kalchev-cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
