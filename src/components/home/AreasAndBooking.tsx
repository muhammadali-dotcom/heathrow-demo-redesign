'use client';

import { useState } from 'react';
import { MapPin, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

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

export default function AreasAndBooking() {
  const [selected, setSelected] = useState<(typeof areas)[number] | null>(null);

  return (
    <section className="bg-bg py-20 sm:py-24">
      <Reveal className="mx-auto max-w-6xl section-padding">
      {/* Section header */}
      <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center justify-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Coverage &amp; Booking
        </span>

        <h2
          className="mb-4 text-center text-4xl font-black leading-[1.05] text-fg sm:text-5xl lg:text-6xl"
          style={{ letterSpacing: '-0.045em' }}
        >
          Areas We Serve
        </h2>

        <p className="mx-auto max-w-[760px] text-center text-base leading-8 text-muted sm:text-lg">
          We cover North London and beyond. Click any area for details, or book your ride now.
        </p>
      </div>

      {/* Switcher */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-2xl border border-line bg-surface p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <button className="rounded-xl bg-[var(--color-accent)] px-10 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(204,32,14,0.28)]">
            Areas
          </button>

          <Link
            href="/book"
            className="rounded-xl px-10 py-3 text-sm font-bold text-fg transition-all duration-200 hover:bg-fg/10 hover:-translate-y-0.5"
          >
            Book a Ride
          </Link>
        </div>
      </div>

      {/* Areas panel */}
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="p-6 sm:p-10">
          <p className="mb-8 text-center text-sm leading-relaxed text-muted">
            Click any area to see details about our service in that location.
          </p>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => {
              const isActive = selected?.id === area.id;

              return (
                <button
                  key={area.id}
                  onClick={() =>
                    setSelected((prev) => (prev?.id === area.id ? null : area))
                  }
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${isActive
                    ? 'border-[var(--color-accent)]/60 bg-[var(--color-accent)]/10 shadow-[0_8px_30px_rgba(204,32,14,0.14)]'
                    : 'border-line bg-surface-soft hover:border-[var(--color-accent)]/40 hover:bg-fg/5'
                    }`}
                >
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-muted)' }}
                  />

                  <div>
                    <div className="text-sm font-bold leading-tight text-fg">
                      {area.name}
                    </div>

                    <div
                      className="mt-0.5 text-xs font-semibold"
                      style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-muted)' }}
                    >
                      {area.postcode}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="relative rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-6 sm:p-8">
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-lg bg-fg/10 p-1.5 text-muted transition hover:text-fg"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)] shadow-[0_8px_20px_rgba(204,32,14,0.3)]">
                  <MapPin size={22} className="text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3
                      className="text-xl font-black text-fg"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {selected.name}
                    </h3>

                    <span className="rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/15 px-2 py-0.5 text-xs font-bold text-[var(--color-accent)]">
                      {selected.postcode}
                    </span>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted">
                    {selected.description}
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/book"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(204,32,14,0.25)] transition hover:bg-[var(--color-accent-hover)]"
                    >
                      Book from {selected.name}
                      <ArrowRight size={14} />
                    </Link>

                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-soft px-5 py-2.5 text-sm font-bold text-fg transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      View Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </Reveal>
    </section>
  );
}