import Hero from '@/components/home/Hero';
import BookingWizard from '@/components/booking/BookingWizard';
import TrustBar from '@/components/home/TrustBar';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Fleet from '@/components/home/Fleet';
import AreasAndBooking from '@/components/home/AreasAndBooking';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/',
  title: 'Mill Hill Taxis, Airport Transfers & School Runs | Bittacy Cars',
  description:
    'Book reliable Mill Hill taxis, airport transfers, school runs and private hire cars across North London with Bittacy Cars. Call 020 3761 7526.',
  keywords: ['taxi near Mill Hill', '24 hour taxi Mill Hill', 'private hire North London'],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={serviceJsonLd('/')} />
      <Hero />
      <BookingWizard />
      <TrustBar />
      <Services />
      <WhyChooseUs />
      <Fleet />
      <AreasAndBooking />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
