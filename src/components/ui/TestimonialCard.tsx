import { Quote, Star } from 'lucide-react';
import { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className="h-full p-6 rounded-2xl flex flex-col gap-4"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-line)',
      }}
    >
      <Quote size={20} style={{ color: 'var(--color-accent)' }} />
      <p className="text-muted leading-relaxed text-sm flex-1">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <span className="text-fg font-semibold text-sm">{testimonial.name}</span>
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={13} fill="var(--color-accent)" style={{ color: 'var(--color-accent)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
