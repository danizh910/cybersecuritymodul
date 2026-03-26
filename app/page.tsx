'use client';

import { ConsentBanner } from '@/components/consent-banner';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <ConsentBanner />
    </div>
  );
}
