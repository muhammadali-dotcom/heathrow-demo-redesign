'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Users, Luggage } from 'lucide-react'
import { FleetVehicle } from '@/types/fleet'

interface VehicleSelectorProps {
  vehicles: FleetVehicle[]
  selectedId: string
  passengers: number
  onSelect: (id: string) => void
}

const RED = 'var(--color-accent)'

export default function VehicleSelector({
  vehicles,
  selectedId,
  passengers,
  onSelect,
}: VehicleSelectorProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isLight = mounted && resolvedTheme === 'light'

  return (
    <div className="mt-5">
      <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted">
        Vehicle{' '}
        <span className="normal-case font-normal tracking-normal text-muted">
          (optional)
        </span>
      </label>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {vehicles.map((vehicle) => {
          const isDisabled = vehicle.passengers < passengers
          const isSelected = vehicle.id === selectedId

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
              className="group relative flex flex-col overflow-hidden rounded-xl text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              style={{
                background: isSelected
                  ? 'rgba(var(--color-accent-rgb), 0.1)'
                  : 'var(--color-surface)',
                border: isSelected
                  ? `1px solid ${RED}`
                  : '1px solid var(--color-line)',
                opacity: isDisabled ? 0.35 : 1,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                boxShadow: isSelected ? '0 0 20px rgba(var(--color-accent-rgb), 0.15)' : 'none',
              }}
            >
              {/* Selected dot */}
              {isSelected && (
                <span
                  className="absolute top-2 right-2 z-10 h-2 w-2 rounded-full"
                  style={{ background: RED }}
                />
              )}

              {/* Image */}
              <div
                className="relative h-24 w-full overflow-hidden sm:h-32"
                style={{ background: 'var(--color-surface-soft)' }}
              >
                <Image
                  src={isLight && vehicle.imageLight ? vehicle.imageLight : vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover p-2 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>

              <div className="px-2.5 pt-2 pb-3 text-center">
                {/* Name */}
                <span
                  className="block text-xs font-bold leading-tight sm:text-sm"
                  style={{ color: isSelected ? 'var(--color-fg)' : 'var(--color-fg-soft)' }}
                >
                  {vehicle.name}
                </span>

                {/* Capacity */}
                <div className="mt-1.5 flex items-center justify-center gap-1.5">
                  <span
                    className="flex items-center gap-0.5 text-[10px]"
                    style={{ color: isSelected ? 'var(--color-fg)' : 'var(--color-muted)' }}
                  >
                    <Users size={9} style={{ color: isSelected ? RED : 'var(--color-muted)' }} />
                    {vehicle.passengers}
                  </span>
                  <span className="text-[10px] text-muted">·</span>
                  <span
                    className="flex items-center gap-0.5 text-[10px]"
                    style={{ color: isSelected ? 'var(--color-fg)' : 'var(--color-muted)' }}
                  >
                    <Luggage size={9} style={{ color: isSelected ? RED : 'var(--color-muted)' }} />
                    {vehicle.luggage}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
