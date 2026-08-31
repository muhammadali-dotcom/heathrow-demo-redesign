import { testimonials } from '@/data/testimonials';
import SectionTitle from '@/components/ui/SectionTitle';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Reveal from '@/components/ui/Reveal';

export default function Testimonials() {
  return (
    <section className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <SectionTitle
            label="Reviews"
            title="What Our Customers Say"
            subtitle="Don't just take our word for it — hear from our happy passengers."
            centered
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 items-stretch">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={index * 0.08} className="h-full">
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
