'use client';

import { useState } from 'react';
import { MapPin, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const areas = [
  {
    id: 'finchley-central',
    name: 'Finchley Central',
    postcode: 'N3',
    description:
      'Reliable Finchley Central taxis and minicabs for fast local travel and airport transfers.',
  },
  {
    id: 'east-finchley',
    name: 'East Finchley',
    postcode: 'N2',
    description:
      'Premium East Finchley cabs and minicab service for comfortable city car transfers.',
  },
  {
    id: 'north-finchley',
    name: 'North Finchley',
    postcode: 'N12',
    description:
      'Professional North Finchley taxi service providing affordable cars and reliable transfers.',
  },
  {
    id: 'hendon',
    name: 'Hendon',
    postcode: 'NW4',
    description:
      'Quick Hendon cabs and minicabs available 24/7 for all your airport transfer needs.',
  },
  {
    id: 'colindale',
    name: 'Colindale',
    postcode: 'NW9',
    description:
      'Efficient Colindale minicab service offering luxury cars for safe local and long transfers.',
  },
  {
    id: 'edgware',
    name: 'Edgware',
    postcode: 'HA8',
    description:
      'Top-rated Edgware taxis and cabs providing seamless airport transfer service daily.',
  },
  {
    id: 'friern-barnet',
    name: 'Friern Barnet',
    postcode: 'N11',
    description:
      'Dependable Friern Barnet minicabs and taxis for timely car transfers across the city.',
  },
  {
    id: 'whetstone',
    name: 'Whetstone',
    postcode: 'N20',
    description:
      'Modern Whetstone cars and minicab service tailored for fast and easy airport transfers.',
  },
  {
    id: 'high-barnet',
    name: 'High Barnet – Cockfosters',
    postcode: 'EN4',
    description:
      'Trusted High Barnet taxis and cabs offering premium transfer service at low rates.',
  },
  {
    id: 'barnet',
    name: 'Barnet',
    postcode: 'EN5',
    description:
      'Quality Barnet minicabs and private hire cars for all your local taxi transfers.',
  },
  {
    id: 'golders-green',
    name: 'Golders Green',
    postcode: 'NW11',
    description:
      'Fast Golders Green cabs and minicab service for professional airport car transfers.',
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
              background: 'rgba(204,32,14,0.12)',
              border: '1px solid rgba(204,32,14,0.3)',
              color: '#cc200e',
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
                    ? 'linear-gradient(135deg, rgba(204,32,14,0.18), rgba(139,0,0,0.12))'
                    : 'var(--color-surface)',
                  border: isActive
                    ? '1px solid rgba(204,32,14,0.55)'
                    : '1px solid var(--color-line)',
                  boxShadow: isActive ? '0 8px 30px rgba(204,32,14,0.15)' : 'none',
                  transform: isActive ? 'translateY(-2px)' : '',
                }}
              >
                <MapPin
                  size={16}
                  className="flex-shrink-0 mt-0.5 transition-colors duration-200"
                  style={{ color: isActive ? '#cc200e' : 'var(--color-muted)' }}
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
                    style={{ color: isActive ? '#cc200e' : 'var(--color-muted)' }}
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
              background: 'linear-gradient(135deg, rgba(204,32,14,0.1), rgba(139,0,0,0.06))',
              border: '1px solid rgba(204,32,14,0.3)',
              boxShadow: '0 16px 50px rgba(204,32,14,0.12)',
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
                  background: 'linear-gradient(135deg, #cc200e, #A93226)',
                  boxShadow: '0 8px 20px rgba(204,32,14,0.35)',
                }}
              >
                <MapPin size={22} className="text-white" />
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
                      background: 'rgba(204,32,14,0.15)',
                      border: '1px solid rgba(204,32,14,0.3)',
                      color: '#cc200e',
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
                    className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-5 py-2.5 text-white transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #cc200e, #A93226)',
                      boxShadow: '0 8px 20px rgba(204,32,14,0.3)',
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
