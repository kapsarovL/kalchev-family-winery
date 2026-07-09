"use client";

import React, { useState } from "react";

type OrderItem = {
  id: number;
  wineId: number;
  wineName: string;
  winePrice: string;
  quantity: number;
};

type Order = {
  id: number;
  customerName: string;
  customerEmail: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postalCode: string;
  country: string;
  deliveryNotes: string | null;
  status: string;
  total: string;
  createdAt: Date;
  items: OrderItem[];
};

const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

type Props = {
  orders: Order[];
  embedded?: boolean;
};

export default function OrderClient({ orders, embedded }: Props) {
  const [orderList, setOrderList] = useState(orders);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  async function updateStatus(orderId: number, newStatus: string) {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrderList((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
        );
      }
    } catch {
      // silent
    }
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    if (embedded) return <>{children}</>;
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-playfair font-bold text-wineRed-100 mb-8">
            Order Management
          </h1>
          {children}
        </div>
      </div>
    );
  }

  return (
    <Wrapper>
      {orderList.length === 0 ? (
        <div className="text-center py-16 text-deepBrown-100/50 font-inter">No orders yet.</div>
      ) : (
        <>
          <p className="mb-4 font-inter text-deepBrown-100/70">{orderList.length} order(s)</p>
          <div className="overflow-x-auto rounded-lg border border-cream-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream-100 border-b border-cream-200">
                  <th className="px-4 py-3 text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter">
                    #
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter">
                    Total
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr
                      onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                      className="bg-white-100 border-b border-cream-200 hover:bg-cream-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3">
                        <span className="font-playfair font-bold text-deepBrown-300">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-deepBrown-300 font-inter">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-3 text-sm text-deepBrown-100/70 font-inter">
                        {order.customerEmail}
                      </td>
                      <td className="px-4 py-3 text-sm text-deepBrown-100/70 font-inter whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gold-100 font-inter">
                        {order.total}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-inter border ${statusColors[order.status] ?? "bg-gray-100 text-gray-700"}`}
                        >
                          {statusLabels[order.status] ?? order.status}
                        </span>
                      </td>
                    </tr>
                    {expandedId === order.id && (
                      <tr className="bg-cream-50/50">
                        <td colSpan={6} className="p-0">
                          <div className="border-t border-cream-200 px-6 py-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-deepBrown-100/50 font-inter text-xs uppercase tracking-wide mb-1">
                                  Contact
                                </p>
                                <p className="text-deepBrown-300 font-inter">
                                  {order.customerName}
                                </p>
                                <p className="text-deepBrown-100/70 font-inter">
                                  {order.customerEmail}
                                </p>
                                <p className="text-deepBrown-100/70 font-inter">{order.phone}</p>
                              </div>
                              <div>
                                <p className="text-deepBrown-100/50 font-inter text-xs uppercase tracking-wide mb-1">
                                  Delivery Address
                                </p>
                                <p className="text-deepBrown-300 font-inter">
                                  {order.addressLine1}
                                </p>
                                {order.addressLine2 && (
                                  <p className="text-deepBrown-100/70 font-inter">
                                    {order.addressLine2}
                                  </p>
                                )}
                                <p className="text-deepBrown-100/70 font-inter">
                                  {order.city}, {order.postalCode}
                                </p>
                                <p className="text-deepBrown-100/70 font-inter">{order.country}</p>
                              </div>
                            </div>
                            {order.deliveryNotes && (
                              <div>
                                <p className="text-deepBrown-100/50 font-inter text-xs uppercase tracking-wide mb-1">
                                  Delivery Notes
                                </p>
                                <p className="text-deepBrown-100/70 font-inter text-sm">
                                  {order.deliveryNotes}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-deepBrown-100/50 font-inter text-xs uppercase tracking-wide mb-2">
                                Items
                              </p>
                              <div className="space-y-1">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-deepBrown-100 font-inter">
                                      {item.wineName} &times; {item.quantity}
                                    </span>
                                    <span className="text-deepBrown-300">{item.winePrice}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-deepBrown-100/50 font-inter text-xs uppercase tracking-wide mb-2">
                                Status
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {statuses.map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => updateStatus(order.id, s)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium font-inter border transition-colors ${
                                      order.status === s
                                        ? statusColors[s] + " ring-2 ring-wineRed-100/30"
                                        : "border-cream-200 text-deepBrown-100/60 hover:border-wineRed-100/30 hover:text-wineRed-100"
                                    }`}
                                  >
                                    {statusLabels[s]}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-deepBrown-100/40 font-inter">
                              Ordered on{" "}
                              {new Date(order.createdAt).toLocaleString("en-US", {
                                dateStyle: "long",
                                timeStyle: "short",
                              })}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Wrapper>
  );
}
