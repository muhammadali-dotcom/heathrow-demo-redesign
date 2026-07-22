import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, CheckCircle, Phone, Star, Zap } from 'lucide-react';
import { PHONE } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';
import Reveal from '@/components/ui/Reveal';

export const metadata = buildMetadata({
  path: '/local-rides',
  title: 'Local Rides | Bittacy Cars – Taxis Across North London',
  description:
    'Comfortable, affordable local taxi rides across Mill Hill and North London. Available 24/7 with fixed prices. Book your local ride with Bittacy Cars.',
  image: '/images/fleet/local.png',
  keywords: [
    'local taxi Mill Hill',
    'taxi Barnet',
    'taxi Hendon',
    'taxi Finchley',
    'taxi Edgware',
  ],
});

const areas = [
  'Mill Hill',
  'Barnet',
  'Hendon',
  'Golders Green',
  'Finchley',
  'Edgware',
  'Brent Cross',
  'Hampstead',
  'Harrow',
  'Wembley',
  'Cricklewood',
  'Colindale',
  'Burnt Oak',
  'Totteridge',
  'Whetstone',
];

const features = [
  {
    icon: Zap,
    title: 'Instant Booking',
    description:
      'Need a ride right now? Call us and we can have a driver with you within minutes across the local area.',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description:
      'Day or night, weekday or weekend — we are always available to get you where you need to go.',
  },
  {
    icon: CheckCircle,
    title: 'Fixed Prices',
    description:
      "Transparent, fixed pricing with no hidden charges. Know exactly what you'll pay before you book.",
  },
  {
    icon: Star,
    title: 'Top-Rated Drivers',
    description:
      'Our professional, friendly drivers know North London inside out and always find the quickest routes.',
  },
  {
    icon: MapPin,
    title: 'Local Expertise',
    description:
      'Based in Mill Hill, we know every road in North London and use local knowledge to beat the traffic.',
  },
  {
    icon: Phone,
    title: 'Easy Booking',
    description:
      'Book by phone in seconds. No complicated apps — just a quick call and your driver is on the way.',
  },
];

export default function LocalRidesPage() {
  return (
    <main className="bg-bg text-fg">
      <JsonLd data={serviceJsonLd('/local-rides')} />
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pb-24 pt-28 sm:pt-32 lg:pt-40"
        style={{
          background: 'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse, rgba(204,32,14,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <Reveal className="max-w-4xl mx-auto text-center relative z-10">
          <span
            className="mb-6 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: 'rgba(204,32,14,0.12)',
              border: '1px solid rgba(204,32,14,0.3)',
              color: '#cc200e',
            }}
          >
            <MapPin size={14} />
            Local Rides
          </span>

          <h1
            className="mb-6 text-4xl font-black text-fg sm:text-6xl lg:text-7xl"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Your Local <span style={{ color: '#cc200e' }}>Taxi</span>
            <br />
            in North London
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-muted p-4">
            Comfortable, reliable and affordable local taxi rides anywhere across
            Mill Hill and North London. Available 24/7 with fixed, transparent
            prices.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex h-14 min-w-[210px] items-center justify-center gap-2 rounded-xl px-8 text-base font-bold text-white transition-all duration-200"
              style={{
                background: '#cc200e',
                boxShadow: '0 16px 40px rgba(204,32,14,0.3)',
                textDecoration: 'none',
              }}
            >
              <Phone size={16} />
              Call Now
            </a>

            <Link
              href="/contact"
              className="inline-flex h-14 min-w-[210px] items-center justify-center rounded-xl px-8 text-base font-bold text-fg transition-all duration-200"
              style={{
                background: 'var(--color-surface-soft)',
                border: '1px solid var(--color-line)',
                textDecoration: 'none',
              }}
            >
              Get a Quote
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Service Image */}
      <section className="px-4 sm:px-6 lg:px-8 py-12" style={{ background: 'var(--color-bg)' }}>
        <div
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl"
          style={{ border: '1px solid var(--color-line)' }}
        >
          <div className="relative h-72 w-full sm:h-96">
            <Image
              src="/images/fleet/local.png"
              alt="Local taxi rides across North London — Bittacy Cars"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* Areas we cover */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20"
        style={{
          background: 'var(--color-bg-alt)',
          borderTop: '1px solid var(--color-line)',
          borderBottom: '1px solid var(--color-line)',
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(204,32,14,0.12)',
                border: '1px solid rgba(204,32,14,0.3)',
                color: '#cc200e',
              }}
            >
              Coverage
            </span>

            <h2
              className="text-4xl font-black text-fg"
              style={{ letterSpacing: '-0.04em' }}
            >
              Areas We Cover
            </h2>
          </Reveal>

          <Reveal className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-fg"
                style={{
                  background: 'var(--color-surface-soft)',
                  border: '1px solid var(--color-line)',
                }}
              >
                <MapPin size={13} style={{ color: '#cc200e' }} />
                {area}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-16 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(204,32,14,0.12)',
                border: '1px solid rgba(204,32,14,0.3)',
                color: '#cc200e',
              }}
            >
              Why Bittacy Cars
            </span>

            <h2
              className="text-4xl font-black text-fg sm:text-5xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              The Local Choice
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal
                  key={feature.title}
                  delay={index * 0.08}
                  className="rounded-2xl p-7"
                  style={{
                    background:
                      'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                  }}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: '#cc200e',
                      boxShadow: '0 8px 20px rgba(204,32,14,0.3)',
                    }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3
                    className="mb-2 text-lg font-bold text-fg"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ background: 'var(--color-bg-alt)' }}>
        <Reveal className="mx-auto max-w-7xl">
          <div
            className="rounded-3xl px-8 py-10 sm:px-12 lg:px-16"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-line)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
            }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl text-left">
                <span
                  className="mb-3 block text-xs font-black uppercase tracking-[0.22em]"
                  style={{ color: '#cc200e' }}
                >
                  Local Rides
                </span>

                <h2
                  className="mb-3 text-4xl font-black text-fg sm:text-5xl"
                  style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
                >
                  Need a Ride Right Now?
                </h2>

                <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Call us and we&apos;ll have a driver with you in minutes.
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-xl px-8 text-base font-bold text-white transition-all duration-200"
                  style={{
                    background: '#cc200e',
                    boxShadow: '0 14px 35px rgba(204,32,14,0.25)',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} />
                  Call {PHONE}
                </a>

                <Link
                  href="/contact"
                  className="inline-flex h-14 min-w-[180px] items-center justify-center rounded-xl px-8 text-base font-bold text-fg transition-all duration-200"
                  style={{
                    background: 'var(--color-surface-soft)',
                    border: '1px solid var(--color-line)',
                    textDecoration: 'none',
                  }}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
