import { testimonials } from '@/data/testimonials';
import SectionTitle from '@/components/ui/SectionTitle';
import TestimonialCard from '@/components/ui/TestimonialCard';

export default function Testimonials() {
  return (
    <section className="py-24 px-4" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Reviews"
          title="What Our Customers Say"
          subtitle="Don't just take our word for it — hear from our happy passengers."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
