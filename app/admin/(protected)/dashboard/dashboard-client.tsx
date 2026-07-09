"use client";

import { useState } from "react";
import OrderClient from "../orders/order-client";
import CalendarClient from "../calendar/calendar-client";

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

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  type: string;
  notes: string | null;
  status: string;
  createdAt: Date;
};

const tabs = [
  { id: "orders", label: "Orders" },
  { id: "calendar", label: "Calendar" },
];

type Props = {
  orders: Order[];
  bookings: Booking[];
};

export default function DashboardClient({ orders, bookings }: Props) {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-playfair font-bold text-wineRed-100">Admin Dashboard</h1>
        </div>

        <div className="flex gap-1 mb-6 border-b border-cream-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-inter font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-white-100 text-wineRed-100 border border-b-0 border-cream-200 -mb-px"
                  : "text-deepBrown-100/50 hover:text-deepBrown-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "orders" && <OrderClient orders={orders} embedded />}
        {activeTab === "calendar" && <CalendarClient bookings={bookings} embedded />}
      </div>
    </div>
  );
}
