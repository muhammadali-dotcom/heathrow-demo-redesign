import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Fleet from '@/components/home/Fleet';
import AreasAndBooking from '@/components/home/AreasAndBooking';
import Testimonials from '@/components/home/Testimonials';
import Statistics from '@/components/home/Statistics';
import CTA from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyChooseUs />
      <Fleet />
      <AreasAndBooking />
      <Testimonials />
      <Statistics />
      <CTA />
    </>
  );
}
