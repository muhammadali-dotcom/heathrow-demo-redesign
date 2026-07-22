'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Users, Luggage } from 'lucide-react';
import { FleetVehicle } from '@/types/fleet';

interface FleetCardProps {
  vehicle: FleetVehicle;
}

export default function FleetCard({ vehicle }: FleetCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && resolvedTheme === 'light';
  const imageSrc = isLight && vehicle.imageLight ? vehicle.imageLight : vehicle.image;

  return (
    <div
      className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-line)',
      }}
    >
      {/* Car image */}
      <div
        className="h-40 relative w-full flex items-center justify-center overflow-hidden"
        style={{ background: 'var(--color-surface-soft)' }}
      >
        <Image
          src={imageSrc}
          alt={vehicle.name}
          fill
          className="object-cover p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-w-768px) 100vw, 25vw"
        />
      </div>

      <div className="p-5">
        <h3 className="text-fg font-bold text-xl mb-3" style={{ letterSpacing: '-0.02em' }}>
          {vehicle.name}
        </h3>
        <div className="flex items-center gap-4 mb-5">
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <Users size={14} style={{ color: 'var(--color-accent)' }} />
            {vehicle.passengers} passengers
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <Luggage size={14} style={{ color: 'var(--color-accent)' }} />
            {vehicle.luggage} bags
          </span>
        </div>

      </div>
    </div>
  );
}
