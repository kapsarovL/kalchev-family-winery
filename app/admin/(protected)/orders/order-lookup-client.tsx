"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface OrderItem {
  wineName: string;
  winePrice: string;
  quantity: number;
}

interface Order {
  id: number;
  status: string;
  total: string;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function OrderLookupClient() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrders(null);

    try {
      const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setOrders(data.orders);
      if (data.orders.length === 0) {
        setError("No orders found for this email.");
      }
    } catch {
      setError("Failed to look up orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleLookup} className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Search by customer email..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-cream-200 bg-white-100 font-inter text-deepBrown-100 text-sm focus:outline-none focus:ring-2 focus:ring-wineRed-100/40 placeholder:text-deepBrown-100/40"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-deepBrown-100/40"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 h-10 bg-wineRed-100 hover:bg-wineRed-100/90 text-white-100 font-inter text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Lookup"}
        </button>
      </form>

      {error && !orders?.length && (
        <p className="text-center text-deepBrown-100/50 font-inter text-sm py-8">{error}</p>
      )}

      {orders && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white-100 rounded-xl border border-cream-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream-50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-playfair font-bold text-wineRed-100 text-sm">
                    #{order.id}
                  </span>
                  <span className="text-deepBrown-100/50 text-xs font-inter">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium font-inter ${STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-inter font-semibold text-wineRed-100 text-sm">
                    {order.total}
                  </span>
                  {expandedId === order.id ? (
                    <ChevronUp size={16} className="text-deepBrown-100/40" />
                  ) : (
                    <ChevronDown size={16} className="text-deepBrown-100/40" />
                  )}
                </div>
              </button>

              {expandedId === order.id && (
                <div className="px-5 pb-4 border-t border-cream-200/50">
                  <table className="w-full mt-3">
                    <thead>
                      <tr className="text-[11px] font-inter text-deepBrown-100/40 uppercase tracking-wide">
                        <th className="text-left pb-2">Item</th>
                        <th className="text-center pb-2">Qty</th>
                        <th className="text-right pb-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i} className="border-t border-cream-200/30">
                          <td className="py-2.5 text-sm font-inter text-deepBrown-100">
                            {item.wineName}
                          </td>
                          <td className="py-2.5 text-sm font-inter text-deepBrown-100/60 text-center">
                            x{item.quantity}
                          </td>
                          <td className="py-2.5 text-sm font-inter text-deepBrown-100 text-right">
                            {item.winePrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
