'use client';

import Link from 'next/link';
import { ArrowRight, Plane, GraduationCap, MapPin, Briefcase } from 'lucide-react';
import { Service } from '@/types/service';

const iconMap: Record<string, React.ElementType> = {
  'airport-transfers': Plane,
  'school-runs': GraduationCap,
  'local-rides': MapPin,
  'corporate-travel': Briefcase,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.id] ?? MapPin;

  return (
    <div
      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-line)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(204,32,14,0.45)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(204,32,14,0.12)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-line)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
      }}
    >
      {/* Image area */}
      <div
        className="h-44 flex items-center justify-center"
        style={{ background: 'rgba(204,32,14,0.05)' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #cc200e, #A93226)', boxShadow: '0 8px 24px rgba(204,32,14,0.35)' }}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-fg font-bold text-lg mb-2" style={{ letterSpacing: '-0.02em' }}>
          {service.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
        <Link
          href={service.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
          style={{ color: '#cc200e' }}
        >
          Learn More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
