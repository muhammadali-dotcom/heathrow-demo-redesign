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
  title: 'Heathrow Minicabs & Airport Transfers | Heathrow Mini Cab',
  description:
    'Book reliable Heathrow minicabs, fixed-price airport transfers and private hire cars across Hounslow, Hayes and West London with Heathrow Mini Cab. Call 020 3761 7526.',
  keywords: ['taxi near Heathrow', '24 hour minicab Heathrow', 'private hire West London'],
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
