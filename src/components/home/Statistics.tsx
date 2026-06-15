'use client';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Availability' },
  { value: 5000, suffix: '+', label: 'Airport Transfers' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction' },
];

export default function Statistics() {
  return (
    <section className="py-20 px-4" style={{ background: '#0B0B0D', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-4xl sm:text-5xl font-black mb-2"
                style={{ color: '#cc200e', letterSpacing: '-0.04em' }}
              >
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <p className="text-[#A1A1AA] text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
