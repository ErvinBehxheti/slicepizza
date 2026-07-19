type Point = { lat: number; lng: number } | string;

function pointParam(point: Point): string {
  return typeof point === "string" ? point : `${point.lat},${point.lng}`;
}

/**
 * Builds a Google Maps driving-directions deep link. No API key or billing
 * required — just a URL. Works in both the Google Maps app (mobile) and web.
 */
export function buildDirectionsUrl(origin: Point, destination: Point): string {
  const params = new URLSearchParams({
    api: "1",
    origin: pointParam(origin),
    destination: pointParam(destination),
    travelmode: "driving",
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
