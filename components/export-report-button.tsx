'use client';

import { ExportReportSchema } from '@/types/demo';

export function ExportReportButton({ report }: { report: ExportReportSchema }) {
  function exportLocal() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transparency-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button onClick={exportLocal} className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium">
      Meinen aktuellen Demo-Bericht lokal exportieren
    </button>
  );
}
