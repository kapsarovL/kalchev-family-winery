"use client";

import React, { useState, useEffect, useCallback } from "react";

type Evidence = {
  id: number;
  bookingId: number;
  type: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
};

type Props = {
  bookingId: number;
};

const evidenceTypes = ["photo", "note", "feedback"] as const;

const typeIcons: Record<string, string> = {
  photo: "📷",
  note: "📝",
  feedback: "⭐",
};

const typeLabels: Record<string, string> = {
  photo: "Photo",
  note: "Note",
  feedback: "Feedback",
};

export default function EvidencePanel({ bookingId }: Props) {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [evType, setEvType] = useState<string>("note");
  const [evDesc, setEvDesc] = useState("");
  const [evFile, setEvFile] = useState<File | null>(null);
  const [evPreview, setEvPreview] = useState<string | null>(null);

  const fetchEvidence = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/evidence?booking_id=${bookingId}`);
      if (res.ok) {
        setEvidence(await res.json());
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (open && evidence.length === 0) {
      fetchEvidence();
    }
  }, [open, evidence.length, fetchEvidence]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setEvFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setEvPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setEvPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!evDesc.trim()) return;

    let imageUrl: string | null = null;

    if (evFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", evFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        if (uploadRes.ok) {
          const data = await uploadRes.json();
          imageUrl = data.url;
        }
      } catch {
        // silent
      } finally {
        setUploading(false);
      }
    }

    try {
      const res = await fetch("/api/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, type: evType, description: evDesc, imageUrl }),
      });
      if (res.ok) {
        const created = await res.json();
        setEvidence((prev) => [created, ...prev]);
        setShowForm(false);
        resetForm();
      }
    } catch {
      // silent
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/evidence?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvidence((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      // silent
    }
  }

  function resetForm() {
    setEvType("note");
    setEvDesc("");
    setEvFile(null);
    setEvPreview(null);
  }

  return (
    <div className="mt-3 border-t border-cream-100 pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs font-inter font-medium text-deepBrown-100/60 hover:text-deepBrown-300 transition-colors"
      >
        <svg
          className={`size-3.5 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Evidence{" "}
        {evidence.length > 0 && (
          <span className="bg-cream-100 text-deepBrown-100/70 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
            {evidence.length}
          </span>
        )}
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          {loading && evidence.length === 0 && (
            <p className="text-[11px] text-deepBrown-100/40 font-inter italic">Loading...</p>
          )}

          {!loading && evidence.length === 0 && (
            <p className="text-[11px] text-deepBrown-100/40 font-inter italic">No evidence yet</p>
          )}

          {evidence.map((ev) => (
            <div
              key={ev.id}
              className="bg-cream-50/70 rounded-lg px-3 py-2 border border-cream-100"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs">{typeIcons[ev.type] ?? "📄"}</span>
                  <span className="text-[10px] font-semibold uppercase text-deepBrown-100/50 font-inter">
                    {typeLabels[ev.type] ?? ev.type}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="text-deepBrown-100/30 hover:text-red-500 transition-colors shrink-0"
                  title="Delete"
                >
                  <svg
                    className="size-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {ev.imageUrl && (
                <div className="relative mt-1.5 rounded-md max-h-32 w-full border border-cream-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ev.imageUrl}
                    alt="Evidence"
                    className="max-h-32 w-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-deepBrown-300 font-inter mt-1">{ev.description}</p>
              <p className="text-[10px] text-deepBrown-100/30 font-inter mt-0.5">
                {new Date(ev.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="text-[11px] font-inter font-medium text-wineRed-100 hover:text-wineRed-100/80 transition-colors"
          >
            + Add Evidence
          </button>
        </div>
      )}

      {/* Add evidence form modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white-100 rounded-xl w-full max-w-md shadow-xl border border-cream-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-cream-200">
              <h4 className="text-sm font-playfair font-semibold text-deepBrown-300">
                Add Evidence
              </h4>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-cream-50 rounded transition-colors text-deepBrown-100/60"
              >
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                  Type
                </label>
                <div className="flex gap-2">
                  {evidenceTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEvType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-inter font-medium border transition-colors ${
                        evType === t
                          ? "bg-wineRed-100/10 text-wineRed-100 border-wineRed-100/30"
                          : "border-cream-200 text-deepBrown-100/60 hover:border-wineRed-100/20"
                      }`}
                    >
                      {typeIcons[t]} {typeLabels[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                  Description
                </label>
                <textarea
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-cream-200 text-sm font-inter text-deepBrown-300 bg-cream-50/50 focus:outline-none focus:ring-2 focus:ring-wineRed-100/20 focus:border-wineRed-100/30 resize-none"
                  placeholder="Describe the evidence..."
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-deepBrown-100/60 uppercase tracking-wider font-inter mb-1">
                  Photo (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full text-sm font-inter text-deepBrown-100/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-inter file:font-medium file:bg-cream-100 file:text-deepBrown-300 hover:file:bg-cream-200 transition-colors"
                />
                {evPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={evPreview}
                    alt="Preview"
                    className="mt-2 rounded-lg max-h-24 object-cover border border-cream-200"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1.5 text-xs font-inter font-medium text-deepBrown-100/60 hover:text-deepBrown-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !evDesc.trim()}
                  className="px-3 py-1.5 bg-wineRed-100 text-cream-50 rounded-lg text-xs font-inter font-medium hover:bg-wineRed-100/90 transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
