import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Mill Hill Taxis, Airport Transfers & School Runs | Bittacy Cars',
  description:
    'Book reliable Mill Hill taxis, airport transfers, school runs and private hire cars across North London with Bittacy Cars. 020 3761 7526.',
  keywords:
    'Mill Hill taxis, North London taxi, airport transfers, school runs, private hire, corporate travel',
  openGraph: {
    title: 'Bittacy Cars | Mill Hill Taxis & Airport Transfers',
    description: 'Premium taxi services in Mill Hill and North London.',
    url: 'https://www.bittacycars.com',
    siteName: 'Bittacy Cars',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#050505] text-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
