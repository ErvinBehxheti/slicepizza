"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Status = "idle" | "locating" | "success" | "error";

export function GeolocationButton({
  dict,
  onLocated,
}: {
  dict: Dictionary;
  onLocated: (lat: number, lng: number) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  function handleClick() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus("error");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocated(position.coords.latitude, position.coords.longitude);
        setStatus("success");
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "locating"}
        className="rounded-full border border-slice-ink/20 px-4 py-2 text-xs font-bold text-slice-ink transition-colors hover:border-slice-red hover:text-slice-red disabled:opacity-60"
      >
        {status === "locating" ? dict.checkout.locating : dict.checkout.useLocation}
      </button>
      {status === "success" && (
        <p className="mt-1 text-xs font-medium text-green-700">
          {dict.checkout.locationSet}
        </p>
      )}
      {status === "error" && (
        <p className="mt-1 text-xs font-medium text-slice-red">
          {dict.checkout.locationError}
        </p>
      )}
    </div>
  );
}
