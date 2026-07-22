"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "./LeafletMap";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton({ height = 260 }: { height?: number }) {
  return (
    <div
      style={{
        height,
        borderRadius: 12,
        border: "1px solid var(--color-line)",
        background: "var(--color-bg-alt)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-muted)",
        fontSize: 13,
      }}
    >
      Loading map…
    </div>
  );
}

interface MapViewProps {
  markers: MapMarker[];
  route?: [number, number][];
  height?: number;
  zoom?: number;
}

export default function MapView({ markers, route, height = 260, zoom }: MapViewProps) {
  return <LeafletMap markers={markers} route={route} height={height} zoom={zoom} />;
}

export type { MapMarker };
