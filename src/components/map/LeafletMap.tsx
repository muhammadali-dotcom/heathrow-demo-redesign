"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes";

export interface MapMarker {
  position: [number, number];
  label?: string;
  popup?: React.ReactNode;
  color?: "pickup" | "dropoff" | "default";
}

interface LeafletMapProps {
  markers: MapMarker[];
  route?: [number, number][];
  height?: number;
  zoom?: number;
}

const MARKER_COLORS: Record<NonNullable<MapMarker["color"]>, string> = {
  pickup: "#22c55e",
  dropoff: "#FFD000",
  default: "#FFD000",
};

// Icon stroke on each marker fill — dark on brand yellow, white on green.
const MARKER_ICON_STROKE: Record<NonNullable<MapMarker["color"]>, string> = {
  pickup: "#fff",
  dropoff: "#0A0A0A",
  default: "#0A0A0A",
};

const CAR_PATHS = `
  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
  <circle cx="7" cy="17" r="2" />
  <path d="M9 17h6" />
  <circle cx="17" cy="17" r="2" />
`;

const OFFICE_PATHS = `
  <path d="M10 12h4" />
  <path d="M10 8h4" />
  <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
  <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
  <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
`;

function createCarIcon(color: string, iconStroke: string, isDark: boolean) {
  const ringColor = isDark ? "#fff" : "#1a1a1a";
  return L.divIcon({
    className: "",
    html: `<div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:28px;height:28px;
      background:${color};
      border:2px solid ${ringColor};
      border-radius:50%;
      box-shadow:0 1px 6px rgba(0,0,0,0.55);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${CAR_PATHS}
      </svg>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function createOfficeIcon(color: string, iconStroke: string, isDark: boolean) {
  const ringColor = isDark ? "#fff" : "#1a1a1a";
  return L.divIcon({
    className: "",
    html: `<div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:40px;height:40px;
      background:${color};
      border:3px solid ${ringColor};
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,0.55);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${iconStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${OFFICE_PATHS}
      </svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}

function createIcon(markerColor: NonNullable<MapMarker["color"]>, isDark: boolean) {
  const color = MARKER_COLORS[markerColor];
  const iconStroke = MARKER_ICON_STROKE[markerColor];
  return markerColor === "default"
    ? createOfficeIcon(color, iconStroke, isDark)
    : createCarIcon(color, iconStroke, isDark);
}

const DEFAULT_CENTER: [number, number] = [51.6155, -0.2405];

function DarkTileLayer() {
  const map = useMap();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Before mount resolvedTheme is undefined — default to dark (matches site defaultTheme)
  const isDark = mounted ? resolvedTheme !== "light" : true;

  useEffect(() => {
    // Use OpenStreetMap tiles — completely free, no API key, no domain restrictions.
    // For dark mode we apply a CSS invert filter via the className.
    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abc",
        maxZoom: 19,
        className: isDark ? "google-like-dark-layer" : "",
      }
    );

    tiles.addTo(map);

    return () => {
      tiles.remove();
    };
  }, [map, isDark]);

  return null;
}

function FitBounds({
  markers,
  route,
}: {
  markers: MapMarker[];
  route?: [number, number][];
}) {
  const map = useMap();
  const key =
    markers.map((m) => m.position.join(",")).join("|") +
    (route ? `|route:${route.length}` : "");

  useEffect(() => {
    const points = [
      ...markers.map((m) => m.position),
      ...(route ?? []),
    ];
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
      return;
    }
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);

  return null;
}

export default function LeafletMap({
  markers,
  route,
  height = 260,
  zoom = 12,
}: LeafletMapProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme !== "light" : true;
  const initialCenter = markers[0]?.position ?? DEFAULT_CENTER;

  return (
    <div
      className="map-wrapper"
      style={{
        height,
        position: "relative",
        zIndex: 0,
        isolation: "isolate",
      }}
    >
      <MapContainer
        center={initialCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "var(--color-surface)" }}
      >
        <DarkTileLayer />
        {route && route.length > 1 && (
          <>
            {/* dark casing keeps the yellow route visible on light map tiles */}
            <Polyline
              positions={route}
              pathOptions={{ color: "#0A0A0A", weight: 7, opacity: 0.6 }}
            />
            <Polyline
              positions={route}
              pathOptions={{ color: "#FFD000", weight: 4, opacity: 0.95 }}
            />
          </>
        )}
        {markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            icon={createIcon(marker.color ?? "default", isDark)}
          >
            {(marker.popup || marker.label) && (
              <Popup>{marker.popup ?? marker.label}</Popup>
            )}
          </Marker>
        ))}
        <FitBounds markers={markers} route={route} />
      </MapContainer>
    </div>
  );
}
