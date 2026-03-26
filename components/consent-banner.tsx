'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ConsentBanner() {
  const [passive, setPassive] = useState(true);
  const [sensitive, setSensitive] = useState(true);
  const [loading, setLoading] = useState<'passive' | 'extended' | 'info-only' | null>(null);
  const router = useRouter();

  function go(mode: 'passive' | 'extended' | 'info-only') {
    setLoading(mode);
    const normalizedPassive = mode === 'info-only' ? false : passive;
    const normalizedSensitive = mode === 'extended' ? sensitive : false;
    const params = new URLSearchParams({
      mode,
      passive: String(normalizedPassive),
      sensitive: String(normalizedSensitive)
    });
    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <section className="app-card p-6 md:p-8">
      <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-900 dark:text-emerald-200">
        Diese Demo zeigt transparent, was eine Webseite prinzipiell sehen kann – ohne versteckte Identifikation und ohne Tracking über Sitzungen hinweg.
      </p>

      <h1 className="mt-5 text-3xl font-bold tracking-tight">Consent-based Browser Transparency Demo</h1>
      <p className="mt-2 max-w-3xl text-muted">
        Didaktische Demo ohne persistente IDs, ohne Drittanbieter-Analytics und mit klarer Trennung zwischen passiver Auswertung und sensiblen Modulen.
      </p>

      <div className="mt-6 space-y-3 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={passive}
            onChange={(e) => setPassive(e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          Zustimmung für passive Auswertung
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sensitive}
            onChange={(e) => setSensitive(e.target.checked)}
            className="h-4 w-4 accent-violet-600"
          />
          Separate Zustimmung für sensible Module
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={() => go('passive')} disabled={loading !== null}>
          {loading === 'passive' ? 'Öffne Demo…' : 'Nur passive Demo starten'}
        </button>
        <button className="btn-secondary" onClick={() => go('extended')} disabled={loading !== null}>
          {loading === 'extended' ? 'Öffne Demo…' : 'Erweiterte Demo mit Freigaben'}
        </button>
        <button className="btn-ghost" onClick={() => go('info-only')} disabled={loading !== null}>
          {loading === 'info-only' ? 'Öffne Info…' : 'Alles ablehnen (nur Info)'}
        </button>
        <Link href="/learn" className="btn-ghost">
          Zur Awareness-Seite
        </Link>
      </div>
    </section>
  );
}
