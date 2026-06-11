import { fleet } from '@/data/fleet';
import SectionTitle from '@/components/ui/SectionTitle';
import FleetCard from '@/components/ui/FleetCard';

export default function Fleet() {
  return (
    <section className="py-24 px-4" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Our Fleet"
          title="Ride in Comfort and Style"
          subtitle="Choose from our range of premium vehicles, maintained to the highest standard."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {fleet.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
