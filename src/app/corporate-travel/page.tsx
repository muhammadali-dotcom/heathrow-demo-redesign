import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, CheckCircle, Clock, Star, Phone, Shield, Users, CreditCard } from 'lucide-react';
import { PHONE } from '@/lib/constants';

export const metadata = {
  title: 'Corporate Travel | Bittacy Cars – Business Transport North London',
  description:
    'Premium corporate travel solutions for businesses in North London. Executive vehicles, corporate accounts, monthly invoicing. Professional and reliable.',
};

const features = [
  {
    icon: Star,
    title: 'Executive Fleet',
    description: 'Travel in comfort with our premium executive vehicles, maintained to the highest standard for a professional image.',
  },
  {
    icon: CreditCard,
    title: 'Corporate Accounts',
    description: 'Set up a business account with monthly invoicing, making expense management effortless for your team.',
  },
  {
    icon: Clock,
    title: 'Priority Booking',
    description: 'Corporate clients receive priority booking and dedicated support to ensure no journey is ever delayed.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All journeys are covered by full commercial private hire insurance for complete corporate liability protection.',
  },
  {
    icon: Users,
    title: 'Group Travel',
    description: 'From single executives to large teams, we can coordinate multiple vehicles for events, conferences and transfers.',
  },
  {
    icon: CheckCircle,
    title: 'Reporting',
    description: 'Detailed monthly journey reports to help your accounts team track and manage transport costs efficiently.',
  },
];

export default function CorporateTravelPage() {
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
            background: 'radial-gradient(ellipse, rgba(192,57,43,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
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
            Corporate Travel
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Premium{' '}
            <span style={{ color: '#cc200e' }}>Business</span>
            <br />Transport
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            Professional corporate travel solutions for businesses across North London.
            Executive vehicles, corporate accounts, and priority service — every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white"
              style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 16px 40px rgba(192,57,43,0.3)' }}
            >
              Get Corporate Quote
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white"
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
              src="/images/fleet/corporate.png"
              alt="Corporate travel service — Bittacy Cars"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { value: '50+', label: 'Business Clients' },
            { value: '100%', label: 'On-Time Rate' },
            { value: '24/7', label: 'Priority Support' },
            { value: '0', label: 'Hidden Fees' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-black mb-1" style={{ color: '#cc200e', letterSpacing: '-0.03em' }}>
                {stat.value}
              </div>
              <div className="text-sm text-[#A1A1AA] font-medium">{stat.label}</div>
            </div>
          ))}
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
              Corporate Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              Built for Business
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

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: '#0B0B0D' }}>
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
            <h2 className="text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
              Open a Corporate Account
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Simplify your business travel with a dedicated account, priority support and monthly invoicing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4"
                style={{ background: '#FFFFFF', color: '#A93226', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textDecoration: 'none' }}
              >
                Get in Touch
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
