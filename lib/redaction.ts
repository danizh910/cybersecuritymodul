export function anonymizeIPv4(ip: string): string {
  const parts = ip.split('.');
  if (parts.length !== 4) return 'unbekannt';
  return `${parts[0]}.${parts[1]}.x.x`;
}

export function anonymizeIPv6(ip: string): string {
  const segments = ip.split(':').filter(Boolean);
  if (!segments.length) return 'unbekannt';
  return `${segments.slice(0, 2).join(':')}::xxxx`;
}

export function anonymizeIp(rawIp: string | null): string | undefined {
  if (!rawIp) return undefined;
  const first = rawIp.split(',')[0]?.trim();
  if (!first) return undefined;
  if (first.includes('.')) return anonymizeIPv4(first);
  if (first.includes(':')) return anonymizeIPv6(first);
  return 'anonymisiert';
}
