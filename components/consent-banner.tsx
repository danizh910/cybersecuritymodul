'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ConsentBanner() {
  const [passive, setPassive] = useState(false);
  const [sensitive, setSensitive] = useState(false);
  const router = useRouter();

  function go(mode: 'passive' | 'extended' | 'info-only') {
    const params = new URLSearchParams({ mode, passive: String(passive), sensitive: String(sensitive) });
    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl">
      <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm">
        Diese Demo zeigt nur transparent, was eine Webseite prinzipiell sehen kann. Es wird keine versteckte Identifikation und kein Tracking ueber Sitzungen hinweg durchgefuehrt.
      </p>
      <h1 className="mt-4 text-2xl font-bold">Consent-based Browser Transparency Demo</h1>
      <p className="mt-2 text-slate-300">Didaktische Demo ohne Tracking, ohne persistente IDs, ohne Drittanbieter-Analytics.</p>
      <div className="mt-4 space-y-2 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={passive} onChange={(e) => setPassive(e.target.checked)} /> Zustimmung fuer passive Auswertung</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={sensitive} onChange={(e) => setSensitive(e.target.checked)} /> Separate Zustimmung fuer sensible Module</label>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-md bg-blue-600 px-4 py-2" onClick={() => go('passive')}>Nur passive Demo starten</button>
        <button className="rounded-md bg-violet-600 px-4 py-2" onClick={() => go('extended')}>Erweiterte Demo mit einzelnen Freigaben</button>
        <button className="rounded-md border border-white/20 px-4 py-2" onClick={() => go('info-only')}>Alles ablehnen und nur Infoseite ansehen</button>
        <Link href="/learn" className="rounded-md border border-white/20 px-4 py-2">Zur Awareness-Seite</Link>
      </div>
    </section>
  );
}
