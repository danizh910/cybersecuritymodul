import { BrowserVisibleInfo } from '@/types/demo';

function toField(
  key: string,
  label: string,
  value: unknown,
  sourceApi: string,
  sensitivity: 'niedrig' | 'mittel' | 'hoch',
  explanation: string
) {
  return {
    key,
    label,
    value: String(value ?? 'nicht verfuegbar'),
    sourceApi,
    mode: 'passiv' as const,
    permissionRequired: false,
    sensitivity,
    explanation
  };
}

export function collectBrowserInfo(): BrowserVisibleInfo {
  if (typeof window === 'undefined') {
    return {
      collectedAt: new Date().toISOString(),
      fields: []
    };
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const uaData = (navigator as any).userAgentData;

  return {
    collectedAt: new Date().toISOString(),
    fields: [
      toField('screen', 'Bildschirmaufloesung', `${screen.width}x${screen.height}`, 'window.screen', 'mittel', 'Displaywerte sind direkt im Browser verfuegbar.'),
      toField('viewport', 'Viewport', `${window.innerWidth}x${window.innerHeight}`, 'window.innerWidth/innerHeight', 'mittel', 'Webseiten kennen den sichtbaren Bereich fuer responsive UI.'),
      toField('colorDepth', 'Color Depth', screen.colorDepth, 'screen.colorDepth', 'niedrig', 'Wird fuer Darstellungsoptimierung genutzt.'),
      toField('dpr', 'Device Pixel Ratio', window.devicePixelRatio, 'window.devicePixelRatio', 'mittel', 'Hilft bei Schaerfe und Skalierung.'),
      toField('scheme', 'prefers-color-scheme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', 'matchMedia', 'niedrig', 'Dient zur UI-Anpassung an Nutzerpraeferenzen.'),
      toField('motion', 'prefers-reduced-motion', window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'no-preference', 'matchMedia', 'niedrig', 'Unterstuetzt Barrierefreiheit.'),
      toField('language', 'Sprache', navigator.language, 'navigator.language', 'mittel', 'Locale kann Inhalte und Formatierung steuern.'),
      toField('languages', 'navigator.languages', navigator.languages?.join(', '), 'navigator.languages', 'mittel', 'Mehrsprachigkeit ist oft direkt sichtbar.'),
      toField('timezone', 'Zeitzone', timezone, 'Intl.DateTimeFormat', 'mittel', 'Zeitzone wird fuer Zeitdarstellung verwendet.'),
      toField('platform', 'Platform', navigator.platform, 'navigator.platform', 'mittel', 'Liefert Geraetekontext.'),
      toField('cores', 'hardwareConcurrency', navigator.hardwareConcurrency, 'navigator.hardwareConcurrency', 'mittel', 'Kann Performance-Tuning ermoeglichen.'),
      toField('memory', 'deviceMemory', (navigator as any).deviceMemory ?? 'nicht verfuegbar', 'navigator.deviceMemory', 'mittel', 'Grobe RAM-Klasse fuer adaptive Inhalte.'),
      toField('cookieEnabled', 'Cookies aktiviert', navigator.cookieEnabled, 'navigator.cookieEnabled', 'niedrig', 'Zeigt nur Cookie-Funktionalitaet.'),
      toField('online', 'Online Status', navigator.onLine, 'navigator.onLine', 'niedrig', 'Kann Offline-Erfahrungen steuern.'),
      toField('touch', 'Touch Support', 'ontouchstart' in window, 'window + navigator', 'mittel', 'Nutzt man fuer Touch-optimierte Bedienung.'),
      toField('dnt', 'Do Not Track', navigator.doNotTrack ?? 'nicht verfuegbar', 'navigator.doNotTrack', 'mittel', 'Optionale Datenschutzpraeferenz.'),
      toField('ua', 'User Agent', navigator.userAgent, 'navigator.userAgent', 'hoch', 'Kann Browser/OS-Version offenlegen.'),
      toField('uaData', 'userAgentData', uaData ? JSON.stringify(uaData.toJSON?.() ?? uaData) : 'nicht verfuegbar', 'navigator.userAgentData', 'hoch', 'Client Hints koennen Systemdetails enthalten.'),
      toField('maxTouch', 'maxTouchPoints', navigator.maxTouchPoints, 'navigator.maxTouchPoints', 'mittel', 'Hinweis auf Eingabegeraete.')
    ]
  };
}
