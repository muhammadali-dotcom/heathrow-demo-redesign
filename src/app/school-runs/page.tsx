import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Heart,
  Star,
} from 'lucide-react';
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
    description:
      'Every driver undergoes a thorough Disclosure and Barring Service (DBS) check before joining our team, ensuring complete peace of mind.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description:
      'We plan routes carefully with buffer time to ensure your child is never late for school, regardless of traffic.',
  },
  {
    icon: Heart,
    title: 'Child Welfare First',
    description:
      'Our drivers are trained in child welfare procedures and know how to make children feel safe and comfortable.',
  },
  {
    icon: CheckCircle,
    title: 'Regular Routes',
    description:
      'Set up a regular daily school run and enjoy the same reliable driver and fixed pricing every day.',
  },
  {
    icon: Star,
    title: 'Parent Notifications',
    description:
      "We keep parents informed. You can call us any time to check on your child's journey status.",
  },
  {
    icon: Phone,
    title: 'Direct Communication',
    description:
      'Speak directly to your driver or our dispatch team any time. We are always available to help.',
  },
];

export default function SchoolRunsPage() {
  return (
    <main className="bg-[#050505] text-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 pb-24 pt-40"
        style={{
          background: 'linear-gradient(180deg, #0B0B0D 0%, #050505 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2"
          style={{
            background:
              'radial-gradient(ellipse, rgba(229,9,20,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span
            className="mb-6 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: 'rgba(229,9,20,0.12)',
              border: '1px solid rgba(229,9,20,0.3)',
              color: '#e50914',
            }}
          >
            <GraduationCap size={14} />
            School Runs
          </span>

          <h1
            className="mx-auto mb-6 max-w-4xl text-center text-5xl font-black text-white sm:text-6xl lg:text-7xl"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Safe <span style={{ color: '#e50914' }}>School Runs</span>
            <br />
            Every Day
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-[#A1A1AA]">
            Reliable, safe and punctual school transport for your children across
            North London. All drivers are fully DBS checked and trained for child
            welfare.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-14 min-w-[210px] items-center justify-center rounded-xl px-8 text-base font-bold text-white transition-all duration-200"
              style={{
                background: '#e50914',
                boxShadow: '0 16px 40px rgba(229,9,20,0.3)',
                textDecoration: 'none',
              }}
            >
              Book a School Run
            </Link>

            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex h-14 min-w-[210px] items-center justify-center gap-2 rounded-xl px-8 text-base font-bold text-white transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                textDecoration: 'none',
              }}
            >
              <Phone size={16} />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Service Image */}
      <section className="px-4 py-12" style={{ background: '#050505' }}>
        <div
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="relative h-72 w-full sm:h-96">
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
      <section
        className="px-4 py-12"
        style={{
          background: '#0B0B0D',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {[
            { value: '100%', label: 'DBS Checked Drivers' },
            { value: '5★', label: 'Parent Satisfaction' },
            { value: '10+', label: 'Years Experience' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="mb-1 text-3xl font-black"
                style={{ color: '#e50914', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>

              <div className="text-sm font-medium text-[#A1A1AA]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(229,9,20,0.12)',
                border: '1px solid rgba(229,9,20,0.3)',
                color: '#e50914',
              }}
            >
              Our Commitment
            </span>

            <h2
              className="text-4xl font-black text-white sm:text-5xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              Your Child&apos;s Safety is Our Priority
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl p-7"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: '#e50914',
                      boxShadow: '0 8px 20px rgba(229,9,20,0.3)',
                    }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3
                    className="mb-2 text-lg font-bold text-white"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to set up */}
      <section className="px-4 py-24" style={{ background: '#0B0B0D' }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span
              className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(229,9,20,0.12)',
                border: '1px solid rgba(229,9,20,0.3)',
                color: '#e50914',
              }}
            >
              Getting Started
            </span>

            <h2
              className="text-4xl font-black text-white"
              style={{ letterSpacing: '-0.04em' }}
            >
              Set Up Your School Run
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Contact Us',
                desc: 'Call or message us with your school, address, pick-up times and any special requirements.',
              },
              {
                step: '02',
                title: 'Meet Your Driver',
                desc: "We assign you a dedicated driver who will get to know your child's routine and needs.",
              },
              {
                step: '03',
                title: 'Relax',
                desc: 'Your child is collected and dropped off safely every day, on time, every time.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black text-white"
                  style={{
                    background: '#e50914',
                    boxShadow: '0 8px 24px rgba(229,9,20,0.35)',
                  }}
                >
                  {item.step}
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-3xl px-8 py-10 sm:px-12 lg:px-16"
            style={{
              background: '#0B0B0D',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
            }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl text-left">
                <span
                  className="mb-3 block text-xs font-black uppercase tracking-[0.22em]"
                  style={{ color: '#e50914' }}
                >
                  School Runs
                </span>

                <h2
                  className="mb-3 text-4xl font-black text-white sm:text-5xl"
                  style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
                >
                  Book Your School Run Today
                </h2>

                <p className="max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                  Give your child the safest and most reliable school transport
                  in North London.
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex h-14 min-w-[180px] items-center justify-center rounded-xl px-8 text-base font-bold text-white transition-all duration-200"
                  style={{
                    background: '#e50914',
                    boxShadow: '0 14px 35px rgba(229,9,20,0.25)',
                    textDecoration: 'none',
                  }}
                >
                  Get a Quote
                </Link>

                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-xl px-8 text-base font-bold text-white transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} />
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}