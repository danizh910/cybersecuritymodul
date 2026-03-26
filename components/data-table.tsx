import { BrowserField } from '@/types/demo';
import { SensitivityBadge } from './sensitivity-badge';

export function DataTable({ rows }: { rows: BrowserField[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left">
            <th className="p-2">Feld</th>
            <th className="p-2">Wert</th>
            <th className="p-2">Quelle</th>
            <th className="p-2">Passiv/Aktiv</th>
            <th className="p-2">Berechtigung</th>
            <th className="p-2">Sensitivitaet</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-white/5 align-top">
              <td className="p-2 font-medium">{row.label}<p className="text-xs text-slate-400">{row.explanation}</p></td>
              <td className="p-2 break-all">{row.value}</td>
              <td className="p-2">{row.sourceApi}</td>
              <td className="p-2">{row.mode}</td>
              <td className="p-2">{row.permissionRequired ? 'Ja' : 'Nein'}</td>
              <td className="p-2"><SensitivityBadge level={row.sensitivity} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
