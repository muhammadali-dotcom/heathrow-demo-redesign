import Link from 'next/link';
import Image from 'next/image';
import { Plane, Clock, CheckCircle, MapPin, Phone, Star, Shield } from 'lucide-react';
import { PHONE } from '@/lib/constants';

export const metadata = {
  title: 'Airport Transfers | Bittacy Cars – Mill Hill to All London Airports',
  description:
    'Stress-free airport transfers from Mill Hill to Heathrow, Gatwick, Stansted, Luton & City Airport. Fixed prices, flight tracking, 24/7 service.',
};

const airports = [
  { name: 'Heathrow Airport', code: 'LHR', terminals: '5 terminals' },
  { name: 'Gatwick Airport', code: 'LGW', terminals: 'North & South' },
  { name: 'Stansted Airport', code: 'STN', terminals: 'Main terminal' },
  { name: 'Luton Airport', code: 'LTN', terminals: 'Main terminal' },
  { name: 'London City Airport', code: 'LCY', terminals: 'Main terminal' },
  { name: 'Southend Airport', code: 'SEN', terminals: 'Main terminal' },
];

const features = [
  {
    icon: Clock,
    title: 'Flight Monitoring',
    description: 'We track your flight in real-time and adjust your pickup time for free if your flight is delayed or arrives early.',
  },
  {
    icon: CheckCircle,
    title: 'Fixed Prices',
    description: 'No surge pricing, no hidden extras. Your quote is your final price — guaranteed, no matter what.',
  },
  {
    icon: MapPin,
    title: 'Meet & Greet',
    description: 'Your driver will wait in arrivals with a name board, ready to help with your luggage.',
  },
  {
    icon: Shield,
    title: 'Fully Licensed',
    description: 'All our vehicles are PCO licensed and drivers carry full private hire insurance for your complete safety.',
  },
  {
    icon: Star,
    title: '24/7 Service',
    description: 'Early morning or late night — our drivers are available around the clock, every day of the year.',
  },
  {
    icon: Plane,
    title: 'All Major Airports',
    description: 'We cover all major London airports including Heathrow, Gatwick, Stansted, Luton and City Airport.',
  },
];

export default function AirportTransfersPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0B0B0D 0%, #050505 100%)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(192,57,43,0.13) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(192,57,43,0.12)',
              border: '1px solid rgba(192,57,43,0.3)',
              color: '#cc200e',
            }}
          >
            Airport Transfers
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Stress-Free{' '}
            <span style={{ color: '#cc200e' }}>Airport</span>
            <br />Transfers
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            From Mill Hill to all major London airports — reliable, punctual and affordable.
            We track your flight so you never have to worry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 16px 40px rgba(192,57,43,0.3)' }}
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Phone size={16} />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Service Image */}
      <section className="px-4 py-12" style={{ background: '#050505' }}>
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="relative w-full h-72 sm:h-96">
            <Image
              src="/images/fleet/airport.png"
              alt="Airport transfer service — Bittacy Cars"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* Airports we cover */}
      <section className="py-20 px-4" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#cc200e' }}
            >
              Coverage
            </span>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              Airports We Serve
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {airports.map((airport) => (
              <div
                key={airport.code}
                className="rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  className="text-2xl font-black mb-2"
                  style={{ color: '#cc200e', letterSpacing: '-0.02em' }}
                >
                  {airport.code}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{airport.name}</div>
                <div className="text-[#A1A1AA] text-xs">{airport.terminals}</div>
              </div>
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
              style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#cc200e' }}
            >
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              The Bittacy Difference
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
                    style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 8px 20px rgba(192,57,43,0.3)' }}
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

      {/* How it works */}
      <section className="py-24 px-4" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#cc200e' }}
            >
              Simple Process
            </span>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Book Your Ride', desc: 'Call us or fill in our quote form with your journey details and flight information.' },
              { step: '02', title: 'We Monitor', desc: 'We track your flight and adjust pickup times in real-time at no extra charge.' },
              { step: '03', title: 'Arrive in Comfort', desc: 'Your driver greets you in arrivals and takes you directly to your destination.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black"
                  style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', color: 'white', boxShadow: '0 8px 24px rgba(192,57,43,0.35)' }}
                >
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #cc200e 0%, #A93226 50%, #8B0000 100%)',
            boxShadow: '0 40px 100px rgba(192,57,43,0.35)',
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
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
              Book Your Airport Transfer
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Get a fixed price quote in minutes. No hidden fees, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4"
                style={{ background: '#FFFFFF', color: '#A93226', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textDecoration: 'none' }}
              >
                Get a Free Quote
              </Link>
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white"
                style={{ border: '2px solid rgba(255,255,255,0.4)' }}
              >
                <Phone size={16} />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
