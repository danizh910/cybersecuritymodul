import { SensitivityLevel } from '@/types/demo';

const colorMap: Record<SensitivityLevel, string> = {
  niedrig: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  mittel: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  hoch: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
};

export function SensitivityBadge({ level }: { level: SensitivityLevel }) {
  return <span className={`rounded-full border px-2 py-0.5 text-xs ${colorMap[level]}`}>{level}</span>;
}
