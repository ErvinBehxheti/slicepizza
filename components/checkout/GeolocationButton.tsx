"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

type Status = "idle" | "locating" | "success" | "error";

/** Builds a short, human-readable address from a Nominatim reverse-geocode result. */
function shortAddress(data: {
  address?: Record<string, string>;
  display_name?: string;
}): string | null {
  const a = data.address;
  if (a) {
    const street = [a.road, a.house_number].filter(Boolean).join(" ");
    const place = a.city ?? a.town ?? a.village ?? a.municipality;
    const parts = [street, a.suburb ?? a.neighbourhood, place].filter(Boolean);
    if (parts.length > 0) return parts.join(", ");
  }
  if (data.display_name) {
    return data.display_name.split(",").slice(0, 3).join(",").trim();
  }
  return null;
}

export function GeolocationButton({
  lang,
  dict,
  onLocated,
}: {
  lang: Locale;
  dict: Dictionary;
  onLocated: (coords: { lat: number; lng: number }, address: string) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  function handleClick() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("error");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        const fallback = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        let address = fallback;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${lang}`
          );
          if (res.ok) {
            address = shortAddress(await res.json()) ?? fallback;
          }
        } catch {
          // Reverse geocoding is best-effort — raw coordinates still work.
        }
        onLocated({ lat, lng }, address);
        setStatus("success");
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className="text-right">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "locating"}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slice-red transition hover:text-slice-red-deep disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        {status === "locating" ? dict.checkout.locating : dict.checkout.useLocation}
      </button>
      {status === "success" && (
        <p className="animate-pop mt-0.5 text-xs font-medium text-green-700">
          {dict.checkout.locationSet} ✓
        </p>
      )}
      {status === "error" && (
        <p className="mt-0.5 text-xs font-medium text-slice-red">
          {dict.checkout.locationError}
        </p>
      )}
    </div>
  );
}
