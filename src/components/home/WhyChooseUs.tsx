import { features } from '@/data/features';
import SectionTitle from '@/components/ui/SectionTitle';
import FeatureCard from '@/components/ui/FeatureCard';

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4" style={{ background: '#0B0B0D' }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Why Choose Us"
          title={
            <>
              Experience the{' '}
              <span style={{ color: '#FF1D25' }}>Bittacy</span> Difference
            </>
          }
          subtitle="We go above and beyond to make every journey safe, comfortable, and on time."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
