import { Clock, Sparkles, UserCheck, Headphones, Tag, Plane, ShieldAlert } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
}

const iconMap: Record<string, React.ElementType> = {
  reliable: Clock,
  clean: Sparkles,
  drivers: UserCheck,
  support: Headphones,
  prices: Tag,
  airport: Plane,
};

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = iconMap[feature.id] ?? ShieldAlert;

  return (
    <div
      className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(255,29,37,0.1)', border: '1px solid rgba(255,29,37,0.2)' }}
      >
        <Icon size={18} style={{ color: '#FF1D25' }} />
      </div>
      <h3 className="text-white font-bold text-base mb-2">{feature.title}</h3>
      <p className="text-[#A1A1AA] text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}
