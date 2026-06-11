'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const homeServices = [
  {
    id: 'airport-transfers',
    image: '/images/fleet/airport.png',
    title: 'Airport Transfers',
    description:
      'Reliable door-to-door airport transfer service to all major London airports — Heathrow, Gatwick, Stansted, Luton and City. Fixed prices, meet & greet included.',
    href: '/airport-transfers',
  },
  {
    id: 'school-runs',
    image: '/images/fleet/school.png',
    title: 'School Runs',
    description:
      'Safe, punctual and DBS-checked drivers for your children&apos;s school pickups and drop-offs across North London. Regular or one-off bookings available.',
    href: '/school-runs',
  },
  {
    id: 'local-rides',
    image: '/images/fleet/local.png',
    title: 'Local Rides',
    description:
      'Comfortable and affordable local rides across Finchley, Barnet, Hendon, Golders Green and all surrounding North London areas.',
    href: '/local-rides',
  },
  {
    id: 'corporate-travel',
    image: '/images/fleet/corporate.png',
    title: 'Corporate Travel',
    description:
      'Professional corporate travel solutions for executives and teams. Prompt, discreet and smartly presented drivers for business appointments and events.',
    href: '/corporate-travel',
  },
];

export default function Services() {
  return (
    <section className="py-24 px-4" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Our Services"
          title="Travel Solutions Tailored to You"
          subtitle="From airport transfers to school runs, we cover every journey across North London."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {homeServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = 'translateY(-8px)';
                el.style.borderColor = 'rgba(192,57,43,0.45)';
                el.style.boxShadow = '0 24px 60px rgba(192,57,43,0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = '';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.boxShadow = '';
              }}
            >
              {/* Image area */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* subtle dark overlay so card bg bleeds in slightly */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(5,5,5,0.25)' }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[#A1A1AA] text-sm leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                  style={{ color: '#C0392B' }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}