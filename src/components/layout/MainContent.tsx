'use client';

import { useRef } from 'react';
import ScrollRouteLine from '@/components/ui/ScrollRouteLine';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="flex-1 relative z-10">
      <ScrollRouteLine containerRef={containerRef} />
      {children}
    </main>
  );
}
