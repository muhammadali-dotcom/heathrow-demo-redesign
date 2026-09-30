import BookingWizard from '@/components/booking/BookingWizard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/book',
  title: 'Book a Ride | Heathrow Mini Cab',
  description:
    'Book your taxi with Heathrow Mini Cab. Fast, fixed-price quotes for airport transfers, school runs and local rides across Heathrow and West London.',
  keywords: ['book minicab Heathrow', 'book Heathrow airport transfer', 'Heathrow Mini Cab booking'],
});

export default function BookPage() {
  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '80px' }}>
      <BookingWizard />
    </main>
  );
}
