import { NextRequest } from 'next/server';
import { anonymizeIp } from './redaction';
import { ServerRequestInfo } from '@/types/demo';

export function getServerRequestInfo(req: NextRequest): ServerRequestInfo {
  const h = req.headers;
  const forwarded = h.get('x-forwarded-for');
  return {
    requestTime: new Date().toISOString(),
    requestedUrl: req.url,
    method: req.method,
    hostname: req.nextUrl.hostname,
    userAgent: h.get('user-agent') ?? undefined,
    accept: h.get('accept') ?? undefined,
    acceptLanguage: h.get('accept-language') ?? undefined,
    acceptEncoding: h.get('accept-encoding') ?? undefined,
    secChUa: h.get('sec-ch-ua') ?? undefined,
    secChUaPlatform: h.get('sec-ch-ua-platform') ?? undefined,
    secChUaMobile: h.get('sec-ch-ua-mobile') ?? undefined,
    referer: h.get('referer') ?? undefined,
    origin: h.get('origin') ?? undefined,
    xForwardedForAnonymized: anonymizeIp(forwarded),
    ipAnonymized: anonymizeIp(forwarded) ?? 'nicht verfuegbar'
  };
}
