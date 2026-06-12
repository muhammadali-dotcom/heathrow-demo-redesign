import Image from 'next/image';
import { Users, Luggage } from 'lucide-react';
import { FleetVehicle } from '@/types/fleet';

interface FleetCardProps {
  vehicle: FleetVehicle;
}

export default function FleetCard({ vehicle }: FleetCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Car image */}
      <div
        className="h-40 relative w-full flex items-center justify-center overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-w-768px) 100vw, 25vw"
        />
      </div>

      <div className="p-5">
        <h3 className="text-white font-bold text-xl mb-3" style={{ letterSpacing: '-0.02em' }}>
          {vehicle.name}
        </h3>
        <div className="flex items-center gap-4 mb-5">
          <span className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
            <Users size={14} style={{ color: '#cc200e' }} />
            {vehicle.passengers} passengers
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#A1A1AA]">
            <Luggage size={14} style={{ color: '#cc200e' }} />
            {vehicle.luggage} bags
          </span>
        </div>

      </div>
    </div>
  );
}
