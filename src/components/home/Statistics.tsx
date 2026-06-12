'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Availability' },
  { value: 5000, suffix: '+', label: 'Airport Transfers' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

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
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#A1A1AA] text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
