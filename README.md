# Consent-based Browser Transparency Demo

Eine moderne Next.js-Demoanwendung, die transparent zeigt, welche Informationen eine Webseite technisch ueber Browser und Geraet sehen kann – **ohne verstecktes Tracking, ohne persistente IDs und ohne Profiling**.

## Projektziel
Diese Anwendung ist ein Lehr- und Awareness-Tool. Sie demonstriert nachvollziehbar:
- serverseitig sichtbare Request-Daten,
- clientseitig passiv sichtbare Browserdaten,
- optionale sensible APIs nur nach explizitem Opt-in.

## Tech-Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- API Routes (`/api/request-info`, `/api/health`)

## Quick Start (Development)
```bash
npm install
npm run dev
```
Dann im Browser oeffnen: `http://localhost:3000`

> Wichtig: Die App **nicht** ueber `file://` starten. Nur ueber einen laufenden lokalen Server (`localhost`) nutzen, damit Routing/Hydration korrekt funktionieren.

## Production Build
```bash
npm run build
npm run start
```

## Seitenstruktur
- `/` – Landing + Consent Screen
- `/dashboard` – Hauptdashboard
- `/learn` – Awareness- und Theorie-Seite
- `/api/request-info` – serverseitig sichtbare HTTP-Demo-Daten
- `/api/health` – Healthcheck

## Security Header
Die App setzt Security Header in `next.config.mjs` ueber `async headers()`:
- CSP mit Next.js-kompatiblen `script-src` Regeln (`unsafe-inline`, in dev auch `unsafe-eval`)
- Permissions-Policy mit same-origin-Freigaben fuer `camera`, `microphone`, `geolocation`
- Referrer-Policy, COOP, CORP, X-Frame-Options, nosniff

## Browser-API Unterschiede
Manche APIs sind browser- oder plattformabhaengig:
- `navigator.userAgentData`
- `navigator.deviceMemory`
- `queryLocalFonts`
- Permissions-/Sensor-APIs

Darum zeigt die App bei jedem Modul klar den Zustand:
- nicht gestartet
- nicht erlaubt
- browser unterstuetzt nicht
- erfolgreich gelesen

## Was wurde bewusst NICHT implementiert?
- Canvas-/Audio-/WebGL-Fingerprinting
- Persistente Kennungen zur Wiedererkennung
- Third-Party Skripte / Session Replay / Cross-Site Tracking
- Aggressive ICE-Sammlung in WebRTC
