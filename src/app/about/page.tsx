import { CheckCircle, Clock, Shield, Star, Users, Award, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { PHONE, COMPANY_NAME, LOCATION, LOCATION_COORDS } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import Reveal from '@/components/ui/Reveal';
import MapView from '@/components/map/MapView';

export const metadata = buildMetadata({
  path: '/about',
  title: 'About Us | Heathrow Mini Cab – Heathrow Minicab Service',
  description:
    'Learn about Heathrow Mini Cab, a trusted minicab service serving Heathrow and West London with reliable airport transfers, school runs and local rides.',
  keywords: ['about Heathrow Mini Cab', 'Heathrow minicab company', 'trusted West London taxi service'],
});

const values = [
  {
    icon: Clock,
    title: 'Always On Time',
    description:
      'We know your time is precious. Our drivers are punctual and plan routes carefully to ensure you never miss your flight or appointment.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'All our vehicles are regularly inspected and our drivers are fully licensed and DBS checked for your complete peace of mind.',
  },
  {
    icon: Star,
    title: 'Premium Service',
    description:
      'From immaculate vehicles to friendly professional drivers, we deliver a premium experience every single journey.',
  },
  {
    icon: Users,
    title: 'Community Focused',
    description:
      'Based around Heathrow, we are proud to serve travellers, local residents and businesses across West London with dedication.',
  },
];

const stats = [
  { value: '15+', label: 'Years of Service' },
  { value: '50,000+', label: 'Journeys Completed' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24/7', label: 'Available' },
];

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-28 sm:pt-32 lg:pt-40 pb-24 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)`,
        }}
      >
        {/* Red glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(var(--color-accent-rgb), 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Reveal className="max-w-4xl mx-auto section-padding text-center relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(var(--color-accent-rgb), 0.12)',
              border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
              color: 'var(--color-accent)',
            }}
          >
            Our Story
          </span>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-fg mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            About{' '}
            <span className="accent-word">{COMPANY_NAME}</span>
          </h1>
          <div className="w-full flex justify-center">
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed text-balance">
            Heathrow&apos;s trusted minicab service, delivering reliable, professional and
            comfortable transportation to and from the airport and across West London.
          </p>
          </div>
        </Reveal>
      </section>

      {/* Location map */}
      <section className="pb-16">
        <Reveal className="max-w-5xl mx-auto section-padding">
          <MapView
            height={320}
            markers={[
              {
                position: [LOCATION_COORDS.lat, LOCATION_COORDS.lon],
                popup: (
                  <div>
                    <strong>{COMPANY_NAME}</strong>
                    <br />
                    {LOCATION}
                    <br />
                    {PHONE}
                  </div>
                ),
              },
            ]}
          />
        </Reveal>
      </section>

      {/* Stats bar */}
      <section className="py-12" style={{ background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-line)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="max-w-5xl mx-auto section-padding grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, index) => (
            <Reveal key={s.label} delay={index * 0.08} className="text-center">
              <div className="text-4xl font-black text-fg mb-1" style={{ color: 'var(--color-accent)', letterSpacing: '-0.03em' }}>
                {s.value}
              </div>
              <div className="text-sm text-muted font-medium">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <Reveal className="max-w-7xl mx-auto section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
                style={{
                  background: 'rgba(var(--color-accent-rgb), 0.12)',
                  border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
                  color: 'var(--color-accent)',
                }}
              >
                Who We Are
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-fg mb-6 leading-tight" style={{ letterSpacing: '-0.04em' }}>
                Serving Heathrow<br />with Pride
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Heathrow Mini Cab looks after airport travellers, local residents and businesses
                  across Heathrow and West London. Our mission is simple: to provide a minicab
                  service that people can genuinely rely on, whatever time their flight lands.
                </p>
                <p>
                  Today, we are proud to be one of the most trusted names in the area, known for
                  our punctuality, professional drivers, and immaculate fleet of vehicles. Whether
                  you need an early morning airport transfer, a safe school run for your children,
                  or a comfortable corporate ride — we&apos;ve got you covered.
                </p>
                <p>
                  Every journey matters to us. That&apos;s why we invest in our drivers&apos; training, keep
                  our vehicles in pristine condition, and are always available 24 hours a day,
                  7 days a week.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  'Fully licensed and insured vehicles',
                  'DBS-checked, professional drivers',
                  'Fixed prices — no hidden charges',
                  'Flight monitoring for airport pickups',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-muted">
                    <CheckCircle size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.08), rgba(var(--color-accent-rgb), 0.02))',
                  border: '1px solid rgba(var(--color-accent-rgb), 0.2)',
                }}
              >
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(var(--color-accent-rgb), 0.12)', border: '1px solid rgba(var(--color-accent-rgb), 0.2)' }}
                    >
                      <Award size={24} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <div className="text-fg font-bold text-lg">Award-Winning Service</div>
                      <div className="text-muted text-sm">Recognised locally for excellence</div>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: 'var(--color-line)' }} />
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(var(--color-accent-rgb), 0.12)', border: '1px solid rgba(var(--color-accent-rgb), 0.2)' }}
                    >
                      <MapPin size={24} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <div className="text-fg font-bold text-lg">Local Experts</div>
                      <div className="text-muted text-sm">{LOCATION}</div>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: 'var(--color-line)' }} />
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(var(--color-accent-rgb), 0.12)', border: '1px solid rgba(var(--color-accent-rgb), 0.2)' }}
                    >
                      <Phone size={24} style={{ color: 'var(--color-accent)' }} />
                    </div>
                    <div>
                      <div className="text-fg font-bold text-lg">Always Reachable</div>
                      <div className="text-muted text-sm">{PHONE} — 24/7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Our Values */}
      <section className="py-24" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="max-w-7xl mx-auto section-padding">
          <Reveal className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{
                background: 'rgba(var(--color-accent-rgb), 0.12)',
                border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
                color: 'var(--color-accent)',
              }}
            >
              What Drives Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-fg" style={{ letterSpacing: '-0.04em' }}>
              Our Core Values
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal
                  key={value.title}
                  delay={index * 0.08}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(135deg, var(--color-accent-solid), var(--color-accent-solid-hover))', boxShadow: '0 8px 20px rgba(var(--color-accent-rgb), 0.3)' }}
                  >
                    <Icon size={22} className="text-[var(--color-accent-solid-fg)]" />
                  </div>
                  <h3 className="text-fg font-bold text-lg mb-2" style={{ letterSpacing: '-0.02em' }}>
                    {value.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Reveal className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="text-4xl font-black text-fg mb-4" style={{ letterSpacing: '-0.04em' }}>
            Ready to Ride with Us?
          </h2>
          <p className="text-muted text-lg mb-8 leading-relaxed">
            Experience the Heathrow Mini Cab difference. Book your journey today or get in touch to find out more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-[var(--color-accent-solid-fg)] transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, var(--color-accent-solid), var(--color-accent-solid-hover))', boxShadow: '0 16px 40px rgba(var(--color-accent-rgb), 0.3)' }}
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-fg transition-all duration-200"
              style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-line)' }}
            >
              <Phone size={16} />
              Call {PHONE}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
