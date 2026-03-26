'use client';

import { ReactNode, useState } from 'react';

export function PermissionModule({
  title,
  warning,
  onStart,
  children
}: {
  title: string;
  warning: string;
  onStart: () => Promise<void>;
  children: ReactNode;
}) {
  const [running, setRunning] = useState(false);

  async function handleStart() {
    setRunning(true);
    try {
      await onStart();
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="rounded-xl border border-white/10 bg-card p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-amber-300">{warning}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={handleStart} className="rounded-md bg-blue-600 px-3 py-2 text-sm" disabled={running}>
          {running ? 'Lade…' : 'Starten'}
        </button>
        <button className="rounded-md border border-white/20 px-3 py-2 text-sm">Abbrechen</button>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
