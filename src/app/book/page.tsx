import BookingWizard from '@/components/booking/BookingWizard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/book',
  title: 'Book a Ride | Bittacy Cars',
  description:
    'Book your taxi with Bittacy Cars. Fast, fixed-price quotes for airport transfers, school runs and local rides across North London.',
  keywords: ['book taxi Mill Hill', 'book airport transfer North London', 'Bittacy Cars booking'],
});

export default function BookPage() {
  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '80px' }}>
      <BookingWizard />
    </main>
  );
}
