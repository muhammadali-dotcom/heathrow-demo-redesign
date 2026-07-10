import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FuturisticBackground from '@/components/ui/FuturisticBackground';
import FloatingWidgets from '@/components/ui/FloatingWidgets';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, faqJsonLd, localBusinessJsonLd, websiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#050505] text-white antialiased">
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={faqJsonLd()} />
        {/* Fixed full-viewport futuristic background — z-0, beneath all content */}
        <FuturisticBackground />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
