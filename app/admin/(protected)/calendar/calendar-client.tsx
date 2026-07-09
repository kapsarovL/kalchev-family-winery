"use client";

import React, { useState, useMemo } from "react";
import { z } from "zod";
import EvidencePanel from "./evidence-panel";

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

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  partySize: z.string().min(1, "Party size is required"),
  type: z.string().min(1, "Type is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof bookingSchema>;

const statuses = ["pending", "confirmed", "cancelled", "completed"];
const bookingTypes = ["tasting", "tour", "event"];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-green-100 text-green-700 border-green-200",
};

const typeColors: Record<string, string> = {
  tasting: "text-rose-600",
  tour: "text-indigo-600",
  event: "text-emerald-600",
};

const typeLabels: Record<string, string> = {
  tasting: "Tasting",
  tour: "Tour",
  event: "Event",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) grid.push(i);
  return grid;
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type Props = {
  bookings: Booking[];
  embedded?: boolean;
};

export default function CalendarClient({ bookings, embedded }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [bookingList, setBookingList] = useState(bookings);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    type: "tasting",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [saving, setSaving] = useState(false);

  const days = useMemo(() => getMonthDays(year, month), [year, month]);
  const dateStr = `${MONTHS[month]} ${year}`;

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookingList) {
      const existing = map.get(b.date) ?? [];
      existing.push(b);
      map.set(b.date, existing);
    }
    return map;
  }, [bookingList]);

  const selectedBookings = selectedDate
    ? (bookingsByDate.get(selectedDate) ?? []).sort((a, b) => a.time.localeCompare(b.time))
    : [];

  function goToPrevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
    setSelectedDate(null);
  }

  function goToNextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
    setSelectedDate(null);
  }

  function handleDayClick(day: number) {
    setSelectedDate(formatDate(year, month, day));
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  }

  function openAddForm(date?: string) {
    setForm({
      name: "",
      email: "",
      phone: "",
      date: date ?? selectedDate ?? formatDate(year, month, today.getDate()),
      time: "",
      partySize: "",
      type: "tasting",
      notes: "",
    });
    setFormErrors({});
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      const errors: Partial<Record<keyof FormData, string>> = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0]) errors[issue.path[0] as keyof FormData] = issue.message;
      }
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, partySize: Number(parsed.data.partySize) }),
      });
      if (res.ok) {
        const created = await res.json();
        setBookingList((prev) => [created, ...prev]);
        setShowForm(false);
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(bookingId: number, newStatus: string) {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });
      if (res.ok) {
        setBookingList((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-playfair font-bold text-wineRed-100">Booking Calendar</h1>
            <button
              onClick={() => openAddForm()}
              className="px-4 py-2 bg-wineRed-100 text-cream-50 rounded-lg text-sm font-inter font-medium hover:bg-wineRed-100/90 transition-colors"
            >
              + New Booking
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Calendar */}
          <div className="bg-white-100 rounded-xl border border-cream-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
              <button
                onClick={goToPrevMonth}
                className="p-2 hover:bg-cream-50 rounded-lg transition-colors text-deepBrown-100/60 hover:text-deepBrown-300"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-playfair font-semibold text-deepBrown-300">{dateStr}</h2>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-cream-50 rounded-lg transition-colors text-deepBrown-100/60 hover:text-deepBrown-300"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="px-2 py-3 text-center text-xs font-semibold text-deepBrown-100/50 uppercase tracking-wider font-inter border-b border-cream-200"
                >
                  {d}
                </div>
              ))}
              {days.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} className="aspect-square" />;
                const dateKey = formatDate(year, month, day);
                const dayBookings = bookingsByDate.get(dateKey);
                const isToday =
                  dateKey === formatDate(today.getFullYear(), today.getMonth(), today.getDate());
                const isSelected = dateKey === selectedDate;

                return (
                  <button
                    key={dateKey}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square flex flex-col items-center justify-center relative transition-colors border-b border-r border-cream-100 hover:bg-cream-50/80 ${isSelected ? "bg-cream-100 ring-2 ring-inset ring-wineRed-100/20" : ""}`}
                  >
                    <span
                      className={`text-sm font-inter font-medium ${isToday ? "text-wineRed-100 font-bold" : "text-deepBrown-300"}`}
                    >
                      {day}
                    </span>
                    {dayBookings && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayBookings.slice(0, 3).map((b) => (
                          <span
                            key={b.id}
                            className={`size-1.5 rounded-full ${b.status === "confirmed" || b.status === "completed" ? "bg-emerald-400" : "bg-amber-300"}`}
                          />
                        ))}
                        {dayBookings.length > 3 && (
                          <span className="text-[9px] font-inter text-deepBrown-100/50">
                            +{dayBookings.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side panel — selected day bookings */}
        <div className="bg-white-100 rounded-xl border border-cream-200 overflow-hidden lg:max-h-[550px] lg:overflow-y-auto">
          <div className="px-5 py-4 border-b border-cream-200 flex items-center justify-between">
            <h3 className="font-playfair font-semibold text-deepBrown-300">
              {selectedDate
                ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select a date"}
            </h3>
            {selectedDate && (
              <button
                onClick={() => openAddForm(selectedDate)}
                className="text-xs font-inter font-medium text-wineRed-100 hover:text-wineRed-100/80 transition-colors"
              >
                + Add
              </button>
            )}
          </div>

          {!selectedDate && (
            <div className="p-5 text-center text-deepBrown-100/40 font-inter text-sm">
              Click a date on the calendar to view bookings
            </div>
          )}

          {selectedDate && selectedBookings.length === 0 && (
            <div className="p-5 text-center text-deepBrown-100/40 font-inter text-sm">
              No bookings for this date
            </div>
          )}

          {selectedBookings.map((b) => (
            <div key={b.id} className="px-5 py-4 border-b border-cream-100 last:border-b-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-inter font-semibold text-deepBrown-300 bg-cream-100 px-2 py-0.5 rounded">
                  {b.time}
                </span>
                <span
                  className={`text-xs font-inter font-semibold ${typeColors[b.type] ?? "text-deepBrown-100/70"}`}
                >
                  {typeLabels[b.type] ?? b.type}
                </span>
              </div>
              <p className="text-sm font-medium text-deepBrown-300 font-inter">{b.name}</p>
              <p className="text-xs text-deepBrown-100/60 font-inter">
                {b.email} &middot; {b.phone}
              </p>
              <p className="text-xs text-deepBrown-100/50 font-inter mb-2">
                {b.partySize} guest{b.partySize > 1 ? "s" : ""}
              </p>
              {b.notes && (
                <p className="text-xs text-deepBrown-100/60 font-inter italic mb-2">
                  &ldquo;{b.notes}&rdquo;
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(b.id, s)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium font-inter border transition-colors ${b.status === s ? statusColors[s] + " ring-1 ring-wineRed-100/20" : "border-cream-200 text-deepBrown-100/50 hover:border-wineRed-100/30 hover:text-wineRed-100"}`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>

              <EvidencePanel bookingId={b.id} />
            </div>
          ))}
        </div>
      </div>

      {/* Add booking modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="bg-white-100 rounded-xl w-full max-w-lg shadow-xl border border-cream-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
              <h2 className="text-lg font-playfair font-semibold text-deepBrown-300">
                New Booking
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-cream-50 rounded transition-colors text-deepBrown-100/60"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                    placeholder="Guest name"
                  />
                  {formErrors.name && (
                    <p className="mt-0.5 text-[11px] text-red-500 font-inter">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                    placeholder="guest@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-0.5 text-[11px] text-red-500 font-inter">{formErrors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                    placeholder="+389"
                  />
                  {formErrors.phone && (
                    <p className="mt-0.5 text-[11px] text-red-500 font-inter">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                    Party Size
                  </label>
                  <input
                    name="partySize"
                    type="number"
                    min="1"
                    value={form.partySize}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                  />
                  {formErrors.partySize && (
                    <p className="mt-0.5 text-[11px] text-red-500 font-inter">
                      {formErrors.partySize}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                  />
                  {formErrors.date && (
                    <p className="mt-0.5 text-[11px] text-red-500 font-inter">{formErrors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                    Time
                  </label>
                  <input
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                  />
                  {formErrors.time && (
                    <p className="mt-0.5 text-[11px] text-red-500 font-inter">{formErrors.time}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30"
                >
                  {bookingTypes.map((t) => (
                    <option key={t} value={t}>
                      {typeLabels[t]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30 resize-none"
                  placeholder="Optional notes..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-inter font-medium text-deepBrown-100/60 hover:text-deepBrown-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-wineRed-100 text-cream-50 rounded-lg text-sm font-inter font-medium hover:bg-wineRed-100/90 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Create Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Wrapper>
  );
}
