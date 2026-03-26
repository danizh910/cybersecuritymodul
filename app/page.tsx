'use client';

import { ConsentBanner } from '@/components/consent-banner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="space-y-6">
      <ConsentBanner />
    </div>
  );
}
