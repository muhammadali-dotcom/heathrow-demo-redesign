import { Quote, Star } from 'lucide-react';
import { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-4"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Quote size={20} style={{ color: '#FF1D25' }} />
      <p className="text-[#A1A1AA] leading-relaxed text-sm flex-1">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <span className="text-white font-semibold text-sm">{testimonial.name}</span>
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={13} fill="#FF1D25" style={{ color: '#FF1D25' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
