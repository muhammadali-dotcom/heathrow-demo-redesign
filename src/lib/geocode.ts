export interface GeocodeResult {
  lat: number;
  lon: number;
  displayName: string;
}

// Rough bounding box around Greater London (incl. Heathrow) + main airports,
// used to bias Nominatim results toward locally relevant addresses.
const LONDON_VIEWBOX = "-0.79,51.86,0.51,51.28";

export async function geocodeAddress(
  query: string,
): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (trimmed.length < 3) return null;

  const params = new URLSearchParams({
    format: "json",
    q: trimmed,
    limit: "1",
    viewbox: LONDON_VIEWBOX,
    bounded: "0",
  });

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;

    const data: Array<{ lat: string; lon: string; display_name: string }> =
      await res.json();
    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    };
  } catch {
    return null;
  }
}
