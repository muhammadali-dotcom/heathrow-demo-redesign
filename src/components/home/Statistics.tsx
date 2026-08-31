'use client';

import Reveal from '@/components/ui/Reveal';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Availability' },
  { value: 5000, suffix: '+', label: 'Airport Transfers' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction' },
];

export default function Statistics() {
  return (
    <section className="py-20" style={{ background: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-line)' }}>
      <div className="max-w-5xl mx-auto section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="text-center">
              <div
                className="text-4xl sm:text-5xl font-black mb-2"
                style={{ color: '#cc200e', letterSpacing: '-0.04em' }}
              >
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <p className="text-muted text-sm font-medium">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
