import BookingWizard from '@/components/booking/BookingWizard';

export const metadata = {
  title: 'Book a Ride | Bittacy Cars',
  description:
    'Book your taxi with Bittacy Cars. Fast, fixed-price quotes for airport transfers, school runs and local rides across North London.',
};

export default function BookPage() {
  return (
    <main style={{ background: '#050505', minHeight: '100vh', paddingTop: '80px' }}>
      <BookingWizard />
    </main>
  );
}
