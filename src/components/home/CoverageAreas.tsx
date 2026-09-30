'use client';

import { useState } from 'react';
import { MapPin, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const areas = [
  {
    id: 'heathrow',
    name: 'Heathrow Airport',
    postcode: 'TW6',
    description:
      'Meet & greet minicabs at Heathrow Terminals 2, 3, 4 and 5 with live flight tracking.',
  },
  {
    id: 'hounslow',
    name: 'Hounslow',
    postcode: 'TW3',
    description:
      'Reliable Hounslow taxis and minicabs for fast local travel and Heathrow transfers.',
  },
  {
    id: 'hayes',
    name: 'Hayes',
    postcode: 'UB3',
    description:
      'Quick Hayes cabs and minicabs available 24/7 for all your airport transfer needs.',
  },
  {
    id: 'harlington',
    name: 'Harlington',
    postcode: 'UB3',
    description:
      'Professional Harlington minicab service minutes from Heathrow, day and night.',
  },
  {
    id: 'west-drayton',
    name: 'West Drayton',
    postcode: 'UB7',
    description:
      'Dependable West Drayton taxis for airport hotels, stations and local journeys.',
  },
  {
    id: 'feltham',
    name: 'Feltham',
    postcode: 'TW13',
    description:
      'Affordable Feltham minicabs and private hire cars for local and airport transfers.',
  },
  {
    id: 'staines',
    name: 'Staines',
    postcode: 'TW18',
    description:
      'Comfortable Staines cabs with fixed-price transfers to every Heathrow terminal.',
  },
  {
    id: 'uxbridge',
    name: 'Uxbridge',
    postcode: 'UB8',
    description:
      'Trusted Uxbridge taxis offering premium airport and business transfers at low rates.',
  },
  {
    id: 'slough',
    name: 'Slough',
    postcode: 'SL1',
    description:
      'Fast Slough minicab service for Heathrow flights and journeys into London.',
  },
  {
    id: 'ealing',
    name: 'Ealing',
    postcode: 'W5',
    description:
      'Modern Ealing cars and minicab service tailored for easy Heathrow transfers.',
  },
  {
    id: 'southall',
    name: 'Southall',
    postcode: 'UB1',
    description:
      'Quality Southall minicabs and private hire cars for all your local taxi journeys.',
  },
];

export default function CoverageAreas() {
  const [selected, setSelected] = useState<typeof areas[number] | null>(null);

  const handleSelect = (area: typeof areas[number]) => {
    setSelected((prev) => (prev?.id === area.id ? null : area));
  };

  return (
    <section className="py-24" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="max-w-6xl mx-auto section-padding">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
            style={{
              background: 'rgba(var(--color-accent-rgb), 0.12)',
              border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
              color: 'var(--color-accent)',
            }}
          >
            Coverage
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-fg"
            style={{ letterSpacing: '-0.04em' }}
          >
            Areas We Serve
          </h2>
          <p className="text-muted mt-4 text-base max-w-xl mx-auto leading-relaxed">
            Click any area to see more details about our service in that location.
          </p>
        </div>

        {/* Area grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {areas.map((area) => {
            const isActive = selected?.id === area.id;
            return (
              <button
                key={area.id}
                onClick={() => handleSelect(area)}
                className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all duration-250 group"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.18), rgba(139,0,0,0.12))'
                    : 'var(--color-surface)',
                  border: isActive
                    ? '1px solid rgba(var(--color-accent-rgb), 0.55)'
                    : '1px solid var(--color-line)',
                  boxShadow: isActive ? '0 8px 30px rgba(var(--color-accent-rgb), 0.15)' : 'none',
                  transform: isActive ? 'translateY(-2px)' : '',
                }}
              >
                <MapPin
                  size={16}
                  className="flex-shrink-0 mt-0.5 transition-colors duration-200"
                  style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-muted)' }}
                />
                <div>
                  <div
                    className="font-bold text-sm leading-tight transition-colors duration-200"
                    style={{ color: isActive ? 'var(--color-fg)' : 'var(--color-fg-soft)' }}
                  >
                    {area.name}
                  </div>
                  <div
                    className="text-xs font-semibold mt-0.5 transition-colors duration-200"
                    style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-muted)' }}
                  >
                    {area.postcode}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel — shown when area is selected */}
        {selected && (
          <div
            className="rounded-2xl p-6 sm:p-8 relative transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.1), rgba(139,0,0,0.06))',
              border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
              boxShadow: '0 16px 50px rgba(var(--color-accent-rgb), 0.12)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-fg transition-colors"
              style={{ background: 'var(--color-surface-soft)' }}
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent-solid), var(--color-accent-solid-hover))',
                  boxShadow: '0 8px 20px rgba(var(--color-accent-rgb), 0.35)',
                }}
              >
                <MapPin size={22} className="text-[var(--color-accent-solid-fg)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className="text-xl font-black text-fg"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {selected.name}
                  </h3>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(var(--color-accent-rgb), 0.15)',
                      border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {selected.postcode}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-5">
                  📍 {selected.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-5 py-2.5 text-[var(--color-accent-solid-fg)] transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent-solid), var(--color-accent-solid-hover))',
                      boxShadow: '0 8px 20px rgba(var(--color-accent-rgb), 0.3)',
                    }}
                  >
                    Book from {selected.name} <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-5 py-2.5 text-fg transition-all duration-200"
                    style={{
                      background: 'var(--color-surface-soft)',
                      border: '1px solid var(--color-line)',
                    }}
                  >
                    View Our Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
