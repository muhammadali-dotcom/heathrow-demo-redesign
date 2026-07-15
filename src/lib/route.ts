interface OsrmRouteResponse {
  routes: Array<{
    geometry: { coordinates: [number, number][] };
    distance: number;
    duration: number;
  }>;
}

export async function fetchDrivingRoute(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
): Promise<[number, number][] | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data: OsrmRouteResponse = await res.json();
    const coords = data.routes?.[0]?.geometry?.coordinates;
    if (!coords || coords.length === 0) return null;

    // GeoJSON coordinates are [lon, lat]; Leaflet wants [lat, lon].
    return coords.map(([lon, lat]) => [lat, lon]);
  } catch {
    return null;
  }
}
