import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Shield, Clock, CheckCircle, Phone, Heart, Star } from 'lucide-react';
import { PHONE } from '@/lib/constants';

export const metadata = {
  title: 'School Runs | Bittacy Cars – Safe School Transport in Mill Hill',
  description:
    'Safe, reliable and punctual school runs across North London. All drivers are fully DBS checked. Book your regular school run with Bittacy Cars today.',
};

const features = [
  {
    icon: Shield,
    title: 'DBS Checked Drivers',
    description: 'Every driver undergoes a thorough Disclosure and Barring Service (DBS) check before joining our team, ensuring complete peace of mind.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'We plan routes carefully with buffer time to ensure your child is never late for school, regardless of traffic.',
  },
  {
    icon: Heart,
    title: 'Child Welfare First',
    description: 'Our drivers are trained in child welfare procedures and know how to make children feel safe and comfortable.',
  },
  {
    icon: CheckCircle,
    title: 'Regular Routes',
    description: 'Set up a regular daily school run and enjoy the same reliable driver and fixed pricing every day.',
  },
  {
    icon: Star,
    title: 'Parent Notifications',
    description: 'We keep parents informed. You can call us any time to check on your child\'s journey status.',
  },
  {
    icon: Phone,
    title: 'Direct Communication',
    description: 'Speak directly to your driver or our dispatch team any time. We are always available to help.',
  },
];

export default function SchoolRunsPage() {
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
              color: '#C0392B',
            }}
          >
            School Runs
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Safe{' '}
            <span style={{ color: '#C0392B' }}>School Runs</span>
            <br />Every Day
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            Reliable, safe and punctual school transport for your children across North London.
            All drivers are fully DBS checked and trained for child welfare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white"
              style={{ background: 'linear-gradient(135deg, #C0392B, #A93226)', boxShadow: '0 16px 40px rgba(192,57,43,0.3)' }}
            >
              Book a School Run
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
              src="/images/fleet/school.png"
              alt="Safe school run service — Bittacy Cars"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-12 px-4" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '100%', label: 'DBS Checked Drivers' },
              { value: '5★', label: 'Parent Satisfaction' },
              { value: '10+', label: 'Years Experience' },
              { value: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black mb-1" style={{ color: '#C0392B', letterSpacing: '-0.03em' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-[#A1A1AA] font-medium">{stat.label}</div>
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
              style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#C0392B' }}
            >
              Our Commitment
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              Your Child&apos;s Safety is Our Priority
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
                    style={{ background: 'linear-gradient(135deg, #C0392B, #A93226)', boxShadow: '0 8px 20px rgba(192,57,43,0.3)' }}
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

      {/* How to set up */}
      <section className="py-24 px-4" style={{ background: '#0B0B0D' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#C0392B' }}
            >
              Getting Started
            </span>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
              Set Up Your School Run
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Contact Us', desc: 'Call or message us with your school, address, pick-up times and any special requirements.' },
              { step: '02', title: 'Meet Your Driver', desc: 'We assign you a dedicated driver who will get to know your child\'s routine and needs.' },
              { step: '03', title: 'Relax', desc: 'Your child is collected and dropped off safely every day, on time, every time.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #C0392B, #A93226)', boxShadow: '0 8px 24px rgba(192,57,43,0.35)' }}
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
            background: 'linear-gradient(135deg, #C0392B 0%, #A93226 50%, #8B0000 100%)',
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
              Book Your School Run Today
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Give your child the safest and most reliable school transport in North London.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4"
                style={{ background: '#FFFFFF', color: '#A93226', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textDecoration: 'none' }}
              >
                Get a Quote
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
