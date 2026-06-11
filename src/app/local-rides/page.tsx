import Link from 'next/link';
import { MapPin, Clock, CheckCircle, Phone, Star, Zap } from 'lucide-react';
import { PHONE } from '@/lib/constants';

export const metadata = {
  title: 'Local Rides | Bittacy Cars – Taxis Across North London',
  description:
    'Comfortable, affordable local taxi rides across Mill Hill and North London. Available 24/7 with fixed prices. Book your local ride with Bittacy Cars.',
};

const areas = [
  'Mill Hill', 'Barnet', 'Hendon', 'Golders Green', 'Finchley',
  'Edgware', 'Brent Cross', 'Hampstead', 'Harrow', 'Wembley',
  'Cricklewood', 'Colindale', 'Burnt Oak', 'Totteridge', 'Whetstone',
];

const features = [
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Need a ride right now? Call us and we can have a driver with you within minutes across the local area.',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Day or night, weekday or weekend — we are always available to get you where you need to go.',
  },
  {
    icon: CheckCircle,
    title: 'Fixed Prices',
    description: 'Transparent, fixed pricing with no hidden charges. Know exactly what you\'ll pay before you book.',
  },
  {
    icon: Star,
    title: 'Top-Rated Drivers',
    description: 'Our professional, friendly drivers know North London inside out and always find the quickest routes.',
  },
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Based in Mill Hill, we know every road in North London and use local knowledge to beat the traffic.',
  },
  {
    icon: Phone,
    title: 'Easy Booking',
    description: 'Book by phone in seconds. No complicated apps — just a quick call and your driver is on the way.',
  },
];

export default function LocalRidesPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0B0B0D 0%, #050505 100%)' }}
      >
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
            Local Rides
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Your Local{' '}
            <span style={{ color: '#FF1D25' }}>Taxi</span>
            <br />in North London
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            Comfortable, reliable and affordable local taxi rides anywhere across Mill Hill
            and North London. Available 24/7 with fixed, transparent prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white"
              style={{ background: 'linear-gradient(135deg, #FF1D25, #D90012)', boxShadow: '0 16px 40px rgba(255,29,37,0.3)' }}
            >
              <Phone size={16} />
              Call Now — {PHONE}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Areas we cover */}
      <section className="py-20 px-4" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(255,29,37,0.12)', border: '1px solid rgba(255,29,37,0.3)', color: '#FF1D25' }}
            >
              Coverage
            </span>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              Areas We Cover
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {areas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <MapPin size={12} className="inline mr-1.5" style={{ color: '#FF1D25' }} />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(255,29,37,0.12)', border: '1px solid rgba(255,29,37,0.3)', color: '#FF1D25' }}
            >
              Why Bittacy Cars
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              The Local Choice
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl p-7"
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
                    {feature.title}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: '#0B0B0D' }}>
        <div
          className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF1D25 0%, #D90012 50%, #8B0000 100%)',
            boxShadow: '0 40px 100px rgba(255,29,37,0.35)',
          }}
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
              Need a Ride Right Now?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Call us and we&apos;ll have a driver with you in minutes.
            </p>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-10 py-4"
              style={{ background: '#FFFFFF', color: '#D90012', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textDecoration: 'none' }}
            >
              <Phone size={18} />
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
