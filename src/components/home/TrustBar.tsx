import { Shield, Clock, Star, CreditCard } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const trustItems = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Clock, label: '24/7 Available' },
  { icon: Star, label: '5-Star Rated' },
  { icon: CreditCard, label: 'Fixed Prices' },
];

export default function TrustBar() {
  return (
    <section className="py-6 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0B0B0D' }}>
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon size={18} style={{ color: '#cc200e' }} />
              <span className="text-sm font-medium text-white">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
