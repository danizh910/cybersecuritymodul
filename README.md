# Consent-based Browser Transparency Demo

Eine moderne Next.js-Demoanwendung, die transparent zeigt, welche Informationen eine Webseite technisch ueber Browser und Geraet sehen kann – **ohne verstecktes Tracking, ohne persistente IDs und ohne Profiling**.

## Projektziel
Diese Anwendung ist ein Lehr- und Awareness-Tool. Sie demonstriert nachvollziehbar:
- serverseitig sichtbare Request-Daten,
- clientseitig passiv sichtbare Browserdaten,
- optionale sensible APIs nur nach explizitem Opt-in.

## Sicherheits- und Ethik-Hinweis
Die Demo ist absichtlich defensiv gebaut:
- kein Hashing, keine stabile Fingerprint-ID,
- keine persistente Wiedererkennung (kein Cookie-Identifier, kein localStorage-ID, keine IndexedDB-IDs),
- keine Third-Party-Tracker oder externe Analytics,
- keine Exfiltration an Fremddienste,
- keine Speicherung ueber die aktive Sitzung hinaus.

## Tech-Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- API Routes (`/api/request-info`, `/api/health`)

## Seitenstruktur
- `/` – Landing + Consent Screen
- `/dashboard` – Hauptdashboard
- `/learn` – Awareness- und Theorie-Seite
- `/api/request-info` – serverseitig sichtbare HTTP-Demo-Daten
- `/api/health` – Healthcheck

## Installation
```bash
npm install
```

## Lokal starten
```bash
npm run dev
```
Danach: `http://localhost:3000`

## Produktion
```bash
npm run build
npm run start
```

## Browser-API Unterschiede
Manche APIs sind browser- oder plattformabhaengig:
- `navigator.userAgentData`
- `navigator.deviceMemory`
- `queryLocalFonts`
- Permissions-/Sensor-APIs

Darum zeigt die App bei jedem Modul klar den Zustand:
- nicht gestartet
- nicht erlaubt
- erlaubt
- browser unterstuetzt nicht
- erfolgreich gelesen

## Welche Daten werden nur lokal verarbeitet?
- Clientseitige Browserwerte
- Ergebnisse der optionalen Permission-Module
- Lokaler JSON-Export

## Welche Daten werden nur mit Zustimmung gelesen?
- Geolocation
- Kamera/Mikrofon (nur lokale Freigabepruefung)
- MediaDevices Enumeration
- Local Font Access (wenn unterstuetzt)
- WebRTC Transparenzstatus

## Was wurde bewusst NICHT implementiert?
- Canvas-/Audio-/WebGL-Fingerprinting
- Persistente Kennungen zur Wiedererkennung
- Third-Party Skripte / Session Replay / Cross-Site Tracking
- Aggressive ICE-Sammlung in WebRTC

## Deployment (Vercel)
1. Repository in GitHub/GitLab bereitstellen.
2. In Vercel importieren.
3. Build Command: `npm run build`
4. Output: Next.js Standard
5. Deploy.

Empfehlung: In Produktion die gesetzten Security Header beibehalten und CSP regelmaessig pruefen.
