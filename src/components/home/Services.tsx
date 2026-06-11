'use client';

import Link from 'next/link';
import { Plane, GraduationCap, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const homeServices = [
  {
    id: 'airport-transfers',
    icon: Plane,
    title: 'Airport Transfers',
    description:
      'Reliable door-to-door airport transfer service to all major London airports — Heathrow, Gatwick, Stansted, Luton and City. Fixed prices, meet & greet included.',
    href: '/airport-transfers',
  },
  {
    id: 'school-runs',
    icon: GraduationCap,
    title: 'School Runs',
    description:
      'Safe, punctual and DBS-checked drivers for your children&apos;s school pickups and drop-offs across North London. Regular or one-off bookings available.',
    href: '/school-runs',
  },
  {
    id: 'local-rides',
    icon: MapPin,
    title: 'Local Rides',
    description:
      'Comfortable and affordable local rides across Finchley, Barnet, Hendon, Golders Green and all surrounding North London areas.',
    href: '/local-rides',
  },
  {
    id: 'corporate-travel',
    icon: Briefcase,
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
          {homeServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-8px)';
                  el.style.borderColor = 'rgba(255,29,37,0.45)';
                  el.style.boxShadow = '0 24px 60px rgba(255,29,37,0.12)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = '';
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.boxShadow = '';
                }}
              >
                {/* Icon area */}
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: 'rgba(255,29,37,0.05)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #FF1D25, #D90012)',
                      boxShadow: '0 8px 24px rgba(255,29,37,0.35)',
                    }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
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
                    style={{ color: '#FF1D25' }}
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
