import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  CheckCircle,
  Clock,
  Star,
  Phone,
  Shield,
  Users,
  CreditCard,
} from 'lucide-react';
import { PHONE } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/corporate-travel',
  title: 'Corporate Travel | Bittacy Cars – Business Transport North London',
  description:
    'Premium corporate travel solutions for businesses in North London. Executive vehicles, corporate accounts, monthly invoicing. Professional and reliable.',
  image: '/images/fleet/corporate.png',
  keywords: [
    'corporate travel North London',
    'business taxi Mill Hill',
    'executive car service North London',
  ],
});

const features = [
  {
    icon: Star,
    title: 'Executive Fleet',
    description:
      'Travel in comfort with our premium executive vehicles, maintained to the highest standard for a professional image.',
  },
  {
    icon: CreditCard,
    title: 'Corporate Accounts',
    description:
      'Set up a business account with monthly invoicing, making expense management effortless for your team.',
  },
  {
    icon: Clock,
    title: 'Priority Booking',
    description:
      'Corporate clients receive priority booking and dedicated support to ensure no journey is ever delayed.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description:
      'All journeys are covered by full commercial private hire insurance for complete corporate liability protection.',
  },
  {
    icon: Users,
    title: 'Group Travel',
    description:
      'From single executives to large teams, we can coordinate multiple vehicles for events, conferences and transfers.',
  },
  {
    icon: CheckCircle,
    title: 'Reporting',
    description:
      'Detailed monthly journey reports to help your accounts team track and manage transport costs efficiently.',
  },
];

export default function CorporateTravelPage() {
  return (
    <main className="bg-[#050505] text-white">
      <JsonLd data={serviceJsonLd('/corporate-travel')} />
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pb-24 pt-28 sm:pt-32 lg:pt-40"
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

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span
            className="mb-6 inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              background: 'rgba(229,9,20,0.12)',
              border: '1px solid rgba(229,9,20,0.3)',
              color: '#e50914',
            }}
          >
            <Briefcase size={14} />
            Corporate Travel
          </span>

          <h1
            className="mb-6 text-4xl font-black text-white sm:text-6xl lg:text-7xl"
            style={{
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            Premium <span style={{ color: '#e50914' }}>Business</span>
            <br />
            Transport
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-[#A1A1AA] p-4">
            Professional corporate travel solutions for businesses across North
            London. Executive vehicles, corporate accounts, and priority service —
            every time.
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
              Get Corporate Quote
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
      <section className="px-4 sm:px-6 lg:px-8 py-12" style={{ background: '#050505' }}>
        <div
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="relative h-72 w-full sm:h-96">
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
      <section
        className="px-4 sm:px-6 lg:px-8 py-12"
        style={{
          background: '#0B0B0D',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center lg:grid-cols-4">
          {[
            { value: '50+', label: 'Business Clients' },
            { value: '100%', label: 'On-Time Rate' },
            { value: '24/7', label: 'Priority Support' },
            { value: '0', label: 'Hidden Fees' },
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
      <section className="px-4 sm:px-6 lg:px-8 py-24">
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
              Corporate Features
            </span>

            <h2
              className="text-4xl font-black text-white sm:text-5xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              Built for Business
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

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{ background: '#0B0B0D' }}>
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
                  Corporate Travel
                </span>

                <h2
                  className="mb-3 text-4xl font-black text-white sm:text-5xl"
                  style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}
                >
                  Open a Corporate Account
                </h2>

                <p className="max-w-xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                  Simplify your business travel with priority support, clear
                  reporting and monthly invoicing.
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
                  Get in Touch
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
