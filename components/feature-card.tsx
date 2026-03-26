export function FeatureCard({
  name,
  supported,
  description,
  relevance
}: {
  name: string;
  supported: boolean;
  description: string;
  relevance: string;
}) {
  return (
    <article className="rounded-xl border border-border/40 bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        <span className={`rounded-full px-2 py-1 text-xs ${supported ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-muted'}`}>
          {supported ? 'verfuegbar' : 'nicht verfuegbar'}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <p className="mt-1 text-xs text-muted">Relevanz: {relevance}</p>
      <p className="mt-1 text-xs text-muted">Wir bauen hier bewusst keinen Fingerprint daraus.</p>
    </article>
  );
}
