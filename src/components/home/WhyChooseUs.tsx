import { features } from '@/data/features';
import SectionTitle from '@/components/ui/SectionTitle';
import FeatureCard from '@/components/ui/FeatureCard';
import Reveal from '@/components/ui/Reveal';

export default function WhyChooseUs() {
  return (
    <section className="py-24" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="max-w-7xl mx-auto section-padding">
        <Reveal>
          <SectionTitle
            label="Why Choose Us"
            title={
              <>
                Experience the{' '}
                <span className="accent-word">Heathrow Mini Cab</span> Difference
              </>
            }
            subtitle="We go above and beyond to make every journey safe, comfortable, and on time."
            centered
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((feature, index) => (
            <Reveal key={feature.id} delay={index * 0.08}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
