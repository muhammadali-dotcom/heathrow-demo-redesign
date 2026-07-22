import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FuturisticBackground from '@/components/ui/FuturisticBackground';
import FloatingWidgets from '@/components/ui/FloatingWidgets';
import MainContent from '@/components/layout/MainContent';
import JsonLd from '@/components/seo/JsonLd';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { buildMetadata, faqJsonLd, localBusinessJsonLd, websiteJsonLd } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg text-fg antialiased">
        <ThemeProvider>
          <JsonLd data={localBusinessJsonLd()} />
          <JsonLd data={websiteJsonLd()} />
          <JsonLd data={faqJsonLd()} />
          {/* Fixed full-viewport futuristic background — z-0, beneath all content */}
          <FuturisticBackground />
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
          <FloatingWidgets />
        </ThemeProvider>
      </body>
    </html>
  );
}
