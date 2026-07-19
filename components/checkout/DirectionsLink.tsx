import { SHOP } from "@/lib/config";
import { buildDirectionsUrl } from "@/lib/directions";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function DirectionsLink({
  dict,
  destination,
}: {
  dict: Dictionary;
  destination: { lat: number; lng: number } | string | null;
}) {
  if (!destination) return null;

  const url = buildDirectionsUrl(
    { lat: SHOP.lat, lng: SHOP.lng },
    destination
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-semibold text-slice-red underline hover:text-slice-red-deep"
    >
      {dict.checkout.previewRoute} →
    </a>
  );
}
