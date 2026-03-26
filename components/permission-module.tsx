'use client';

import { ReactNode, useState } from 'react';

export function PermissionModule({
  title,
  warning,
  onStart,
  children,
  statusHint
}: {
  title: string;
  warning: string;
  onStart: () => Promise<void>;
  children: ReactNode;
  statusHint?: string;
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
    <section className="app-card p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-amber-300">{warning}</p>
      {statusHint && <p className="status-warning mt-3">{statusHint}</p>}
      <div className="mt-3 flex gap-2">
        <button onClick={handleStart} className="btn-primary" disabled={running}>
          {running ? 'Lade…' : 'Berechtigung anfragen'}
        </button>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
