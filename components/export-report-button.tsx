'use client';

import { ExportReportSchema } from '@/types/demo';

export function ExportReportButton({ report }: { report: ExportReportSchema }) {
  function exportLocal() {
    if (typeof window === 'undefined') return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transparency-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button onClick={exportLocal} className="btn rounded-lg bg-emerald-600 text-white hover:bg-emerald-500">
      Meinen aktuellen Demo-Bericht lokal exportieren
    </button>
  );
}
