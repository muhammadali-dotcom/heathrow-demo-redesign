import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { PHONE } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';
import Reveal from '@/components/ui/Reveal';

export const metadata = buildMetadata({
  path: '/services',
  title: 'Our Services | Bittacy Cars – Taxi Services in Mill Hill',
  description:
    'Explore all Bittacy Cars services: airport transfers, school runs, local rides and corporate travel across North London.',
  image: '/images/fleet/hero2.png',
  keywords: ['taxi services Mill Hill', 'North London private hire services'],
});

const services = [
  {
    id: 'airport-transfers',
    image: '/images/fleet/airport.png',
    title: 'Airport Transfers',
    tagline: 'Never miss a flight again',
    description:
      'Reliable, stress-free door-to-door airport transfer service to all major London airports including Heathrow, Gatwick, Stansted, Luton and City Airport. We monitor your flight and adjust pickup times accordingly.',
    features: [
      'Flight tracking included',
      'Meet & greet service',
      'Fixed prices — no surprises',
      'All major London airports',
      'Available 24/7',
    ],
    href: '/airport-transfers',
  },
  {
    id: 'school-runs',
    image: '/images/fleet/school.png',
    title: 'School Runs',
    tagline: 'Safe, punctual, reliable',
    description:
      'Give your children the safest and most reliable school run service in North London. All our drivers are fully DBS checked and trained to provide a safe and comfortable journey for your children.',
    features: [
      'DBS-checked drivers',
      'Regular route planning',
      'Child-safe vehicles',
      'Parent notifications',
      'Flexible scheduling',
    ],
    href: '/school-runs',
  },
  {
    id: 'local-rides',
    image: '/images/fleet/local.png',
    title: 'Local Rides',
    tagline: 'Comfort around North London',
    description:
      "Quick, comfortable local taxi rides anywhere across Mill Hill and the wider North London area. Whether it's a shopping trip, night out, or medical appointment, we've got you covered.",
    features: [
      'Instant booking available',
      'Competitive local pricing',
      'Covers all North London',
      'Comfortable modern vehicles',
      'Friendly professional drivers',
    ],
    href: '/local-rides',
  },
  {
    id: 'corporate-travel',
    image: '/images/fleet/corporate.png',
    title: 'Corporate Travel',
    tagline: 'Professional business transport',
    description:
      'Impress clients and keep your team on schedule with our professional corporate travel solutions. Executive vehicles, punctual drivers, and a seamless booking experience for businesses.',
    features: [
      'Executive vehicle options',
      'Corporate accounts available',
      'Monthly invoicing',
      'Priority booking',
      'Professional uniformed drivers',
    ],
    href: '/corporate-travel',
  },
];

export default function ServicesPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh' }}>
      <JsonLd data={serviceJsonLd('/services')} />
      {/* Hero */}
      <section
        className="relative pt-28 sm:pt-32 lg:pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0B0B0D 0%, #050505 100%)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(192,57,43,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Reveal className="max-w-4xl mx-auto text-center relative z-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(192,57,43,0.12)',
              border: '1px solid rgba(192,57,43,0.3)',
              color: '#cc200e',
            }}
          >
            What We Offer
          </span>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6"
            style={{ letterSpacing: '-0.04em', lineHeight: 1.02 }}
          >
            Our{' '}
            <span style={{ color: '#cc200e' }}>Services</span>
          </h1>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            From airport transfers to school runs, we provide comprehensive taxi services
            tailored to every journey across North London.
          </p>
        </Reveal>
      </section>

      {/* Services grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <Reveal
                key={service.id}
                delay={Math.min(index * 0.08, 0.24)}
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? '' : 'lg:[direction:rtl]'}`}>
                  {/* Image panel */}
                  <div className="relative overflow-hidden lg:[direction:ltr]" style={{ minHeight: '360px' }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle gradient overlay so image edges blend into the card */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: isEven
                          ? 'linear-gradient(to right, transparent 60%, rgba(5,5,5,0.6) 100%)'
                          : 'linear-gradient(to left, transparent 60%, rgba(5,5,5,0.6) 100%)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-10 lg:p-14 lg:[direction:ltr] flex flex-col justify-center">
                    <span
                      className="inline-block text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: '#cc200e' }}
                    >
                      {service.tagline}
                    </span>
                    <h2
                      className="text-3xl sm:text-4xl font-black text-white mb-4"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed mb-7">{service.description}</p>
                    <ul className="space-y-2 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                          <CheckCircle size={15} style={{ color: '#cc200e', flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 rounded-xl font-bold text-sm px-6 py-3 text-white transition-all duration-200 hover:brightness-110"
                        style={{
                          background: 'linear-gradient(135deg, #cc200e, #A93226)',
                          boxShadow: '0 8px 24px rgba(192,57,43,0.3)',
                        }}
                      >
                        Learn More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#0B0B0D' }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4" style={{ letterSpacing: '-0.04em' }}>
            Not Sure Which Service?
          </h2>
          <p className="text-[#A1A1AA] text-lg mb-8">
            Call us and we&apos;ll find the best option for your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white hover:brightness-110 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #cc200e, #A93226)',
                boxShadow: '0 16px 40px rgba(192,57,43,0.3)',
              }}
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-base px-8 py-4 text-white hover:bg-white/10 transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <Phone size={16} />
              {PHONE}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
