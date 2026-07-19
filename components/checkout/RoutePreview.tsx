"use client";

import { useState } from "react";
import { SHOP } from "@/lib/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/**
 * Inline route preview: toggles an embedded map with driving directions
 * from the shop to the customer, right under the address field — no new tab.
 */
export function RoutePreview({
  dict,
  destination,
}: {
  dict: Dictionary;
  destination: { lat: number; lng: number } | string | null;
}) {
  const [open, setOpen] = useState(false);

  if (!destination) return null;

  const dest =
    typeof destination === "string"
      ? destination
      : `${destination.lat},${destination.lng}`;
  const src = `https://www.google.com/maps?saddr=${encodeURIComponent(
    `${SHOP.lat},${SHOP.lng}`
  )}&daddr=${encodeURIComponent(dest)}&output=embed`;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slice-red transition hover:text-slice-red-deep"
      >
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 4l6 6-6 6" />
        </svg>
        {open ? dict.checkout.hideRoute : dict.checkout.previewRoute}
      </button>
      {open && (
        <iframe
          src={src}
          title={dict.checkout.routeTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="animate-pop hairline mt-2 h-64 w-full rounded-2xl bg-slice-card"
        />
      )}
    </div>
  );
}
