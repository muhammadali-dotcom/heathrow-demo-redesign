import { CheckCircle, Clock, Shield, Star, Users, Award, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { PHONE, COMPANY_NAME, LOCATION } from '@/lib/constants';

export const metadata = {
  title: 'About Us | Bittacy Cars – Mill Hill Taxi Service',
  description:
    'Learn about Bittacy Cars, Mill Hill\'s most trusted taxi service. Serving North London with reliable airport transfers, school runs, and local rides since 2010.',
};

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
      'Rooted in Mill Hill, we are proud to serve our local community and the wider North London area with dedication.',
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
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 px-4 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, #0B0B0D 0%, #050505 100%)`,
        }}
      >
        {/* Red glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,29,37,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(255,29,37,0.12)',
              border: '1px solid rgba(255,29,37,0.3)',
              color: '#FF1D25',
            }}
          >
            Our Story
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            About{' '}
            <span style={{ color: '#FF1D25' }}>{COMPANY_NAME}</span>
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            Mill Hill&apos;s most trusted taxi service, delivering reliable, professional and
            comfortable transportation across North London since 2010.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 px-4" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black text-white mb-1" style={{ color: '#FF1D25', letterSpacing: '-0.03em' }}>
                {s.value}
              </div>
              <div className="text-sm text-[#A1A1AA] font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
                style={{
                  background: 'rgba(255,29,37,0.12)',
                  border: '1px solid rgba(255,29,37,0.3)',
                  color: '#FF1D25',
                }}
              >
                Who We Are
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6" style={{ letterSpacing: '-0.04em' }}>
                Serving North London<br />with Pride
              </h2>
              <div className="space-y-4 text-[#A1A1AA] leading-relaxed">
                <p>
                  Founded in Mill Hill, Bittacy Cars has been at the heart of North London&apos;s
                  transportation needs for over a decade. We started with a simple mission: to
                  provide a taxi service that people could genuinely rely on.
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
                  <div key={point} className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                    <CheckCircle size={16} style={{ color: '#FF1D25', flexShrink: 0 }} />
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
                  background: 'linear-gradient(135deg, rgba(255,29,37,0.08), rgba(255,29,37,0.02))',
                  border: '1px solid rgba(255,29,37,0.2)',
                }}
              >
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,29,37,0.15) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FF1D25, #D90012)', boxShadow: '0 8px 24px rgba(255,29,37,0.35)' }}
                    >
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Award-Winning Service</div>
                      <div className="text-[#A1A1AA] text-sm">Recognised locally for excellence</div>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,29,37,0.12)', border: '1px solid rgba(255,29,37,0.2)' }}
                    >
                      <MapPin size={24} style={{ color: '#FF1D25' }} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Local Experts</div>
                      <div className="text-[#A1A1AA] text-sm">{LOCATION}</div>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,29,37,0.12)', border: '1px solid rgba(255,29,37,0.2)' }}
                    >
                      <Phone size={24} style={{ color: '#FF1D25' }} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Always Reachable</div>
                      <div className="text-[#A1A1AA] text-sm">{PHONE} — 24/7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4" style={{ background: '#0B0B0D' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{
                background: 'rgba(255,29,37,0.12)',
                border: '1px solid rgba(255,29,37,0.3)',
                color: '#FF1D25',
              }}
            >
              What Drives Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(135deg, #FF1D25, #D90012)', boxShadow: '0 8px 20px rgba(255,29,37,0.3)' }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2" style={{ letterSpacing: '-0.02em' }}>
                    {value.title}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
            Ready to Ride with Us?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8 leading-relaxed">
            Experience the Bittacy Cars difference. Book your journey today or get in touch to find out more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #FF1D25, #D90012)', boxShadow: '0 16px 40px rgba(255,29,37,0.3)' }}
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Phone size={16} />
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
