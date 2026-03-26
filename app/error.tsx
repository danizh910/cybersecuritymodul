'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('App error boundary caught an error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-xl border border-red-500/40 bg-red-500/10 p-6">
      <h2 className="text-xl font-semibold">Es ist ein Fehler aufgetreten.</h2>
      <p className="text-sm text-muted">Die Demo konnte nicht korrekt geladen werden. Bitte versuche es erneut.</p>
      <button onClick={reset} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium">
        Erneut versuchen
      </button>
    </div>
  );
}
