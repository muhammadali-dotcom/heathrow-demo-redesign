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
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#0B0B0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#71717A",
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
