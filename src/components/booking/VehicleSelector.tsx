'use client'

import { Users, Luggage, Car, Caravan, BusFront, Crown } from 'lucide-react'
import { FleetVehicle } from '@/types/fleet'

interface VehicleSelectorProps {
  vehicles: FleetVehicle[]
  selectedId: string
  passengers: number
  onSelect: (id: string) => void
}

const RED = '#e50914'

const getVehicleIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes('estate')) return Caravan
  if (lower.includes('mpv')) return BusFront
  if (lower.includes('executive')) return Crown
  return Car
}

export default function VehicleSelector({
  vehicles,
  selectedId,
  passengers,
  onSelect,
}: VehicleSelectorProps) {
  return (
    <div className="mt-5">
      <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
        Vehicle{' '}
        <span className="normal-case font-normal tracking-normal text-[#71717A]">
          (optional)
        </span>
      </label>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {vehicles.map((vehicle) => {
          const isDisabled = vehicle.passengers < passengers
          const isSelected = vehicle.id === selectedId
          const VehicleIcon = getVehicleIcon(vehicle.name)

          return (
            <button
              key={vehicle.id}
              type="button"
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) onSelect(isSelected ? '' : vehicle.id)
              }}
              className="group relative flex flex-col items-center rounded-xl pt-4 pb-3 px-2 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e50914]"
              style={{
                background: isSelected
                  ? 'linear-gradient(160deg, rgba(229,9,20,0.14) 0%, rgba(229,9,20,0.06) 100%)'
                  : 'rgba(255,255,255,0.04)',
                border: isSelected
                  ? `1px solid ${RED}`
                  : '1px solid rgba(255,255,255,0.09)',
                opacity: isDisabled ? 0.35 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                boxShadow: isSelected ? '0 0 20px rgba(229,9,20,0.15)' : 'none',
              }}
            >
              {/* Selected dot */}
              {isSelected && (
                <span
                  className="absolute top-2 right-2 h-2 w-2 rounded-full"
                  style={{ background: RED }}
                />
              )}

              {/* Icon container */}
              <div
                className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: isSelected
                    ? 'rgba(229,9,20,0.18)'
                    : 'rgba(255,255,255,0.07)',
                  border: isSelected
                    ? '1px solid rgba(229,9,20,0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <VehicleIcon
                  size={18}
                  style={{ color: isSelected ? RED : '#71717A' }}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <span
                className="block text-xs font-bold leading-tight"
                style={{ color: isSelected ? '#fff' : '#D4D4D8' }}
              >
                {vehicle.name}
              </span>

              {/* Capacity */}
              <div className="mt-1.5 flex items-center justify-center gap-1.5">
                <span
                  className="flex items-center gap-0.5 text-[10px]"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.55)' : '#52525B' }}
                >
                  <Users size={9} style={{ color: isSelected ? RED : '#52525B' }} />
                  {vehicle.passengers}
                </span>
                <span className="text-[10px] text-[#3f3f46]">·</span>
                <span
                  className="flex items-center gap-0.5 text-[10px]"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.55)' : '#52525B' }}
                >
                  <Luggage size={9} style={{ color: isSelected ? RED : '#52525B' }} />
                  {vehicle.luggage}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
