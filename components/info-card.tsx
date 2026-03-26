import { ExplanationMetadata } from '@/types/demo';

export function InfoCard({ item }: { item: ExplanationMetadata }) {
  return (
    <article className="rounded-xl border border-white/10 bg-card p-4">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-slate-300">Quelle/API: {item.source}</p>
      <p className="mt-2 text-sm">Beispiel: {item.example}</p>
      <p className="text-sm">Standardmaessig sichtbar: {item.defaultVisible ? 'Ja' : 'Nein'}</p>
      <p className="text-sm">Berechtigung noetig: {item.permissionRequired ? 'Ja' : 'Nein'}</p>
    </article>
  );
}
