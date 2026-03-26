'use client';

import { DataTable } from '@/components/data-table';
import { ExportReportButton } from '@/components/export-report-button';
import { FeatureCard } from '@/components/feature-card';
import { InfoCard } from '@/components/info-card';
import { PermissionModule } from '@/components/permission-module';
import { collectBrowserInfo } from '@/lib/browser-info';
import { detectFeatures } from '@/lib/feature-detection';
import { ExplanationMetadata, ExportReportSchema, PermissionModuleResult, ServerRequestInfo } from '@/types/demo';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const explainCards: ExplanationMetadata[] = [
  { name: 'HTTP Header', source: 'HTTP Request', example: 'accept-language: de-DE', defaultVisible: true, permissionRequired: false, useCases: ['Sprachwahl'], privacyRisks: ['Profilbildung'], transparencyReason: 'Nur anzeigen statt ausnutzen.' },
  { name: 'Geolocation', source: 'navigator.geolocation', example: 'latitude/longitude', defaultVisible: false, permissionRequired: true, useCases: ['Lokale Services'], privacyRisks: ['Standortoffenlegung'], transparencyReason: 'Nur nach Opt-in und ohne Speicherung.' },
  { name: 'Media Permissions', source: 'getUserMedia', example: 'Kamera vorhanden', defaultVisible: false, permissionRequired: true, useCases: ['Videochat'], privacyRisks: ['Missbrauch von Sensoren'], transparencyReason: 'Nur lokale Anzeige ohne Upload.' }
];

export default function DashboardPage() {
  const [mode, setMode] = useState<ExportReportSchema['consentMode']>('info-only');
  const [serverInfo, setServerInfo] = useState<ServerRequestInfo>();
  const [browserInfo, setBrowserInfo] = useState<ReturnType<typeof collectBrowserInfo>>();
  const [urlParams, setUrlParams] = useState<Record<string, string>>({});
  const [referrer, setReferrer] = useState('');
  const [features, setFeatures] = useState<Record<string, boolean>>({});
  const [modules, setModules] = useState<PermissionModuleResult[]>([
    { moduleId: 'geolocation', status: 'nicht gestartet', details: {} },
    { moduleId: 'camera-microphone', status: 'nicht gestartet', details: {} },
    { moduleId: 'media-devices', status: 'nicht gestartet', details: {} },
    { moduleId: 'local-fonts', status: 'nicht gestartet', details: {} },
    { moduleId: 'webrtc', status: 'nicht gestartet', details: {} }
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const nextMode = (searchParams.get('mode') ?? 'info-only') as ExportReportSchema['consentMode'];
    setMode(nextMode);
    setUrlParams(Object.fromEntries(searchParams.entries()));
    setReferrer(document.referrer || 'kein Referer');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetch('/api/request-info').then((r) => r.json()).then(setServerInfo).catch(() => undefined);
    setFeatures(detectFeatures());
    if (mode !== 'info-only') {
      setBrowserInfo(collectBrowserInfo());
    }
  }, [mode]);

  function patchModule(result: PermissionModuleResult) {
    setModules((prev) => prev.map((m) => (m.moduleId === result.moduleId ? result : m)));
  }

  async function startGeo() {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return patchModule({ moduleId: 'geolocation', status: 'browser unterstuetzt nicht', details: {} });
    }

    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          patchModule({ moduleId: 'geolocation', status: 'erfolgreich gelesen', collectedAt: new Date().toISOString(), details: { latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy, timestamp: pos.timestamp } });
          resolve();
        },
        (error) => {
          patchModule({ moduleId: 'geolocation', status: 'nicht erlaubt', details: { reason: error.message || 'Standortzugriff wurde im Browser blockiert.' } });
          resolve();
        }
      );
    });
  }

  async function startCamMic() {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return patchModule({ moduleId: 'camera-microphone', status: 'browser unterstuetzt nicht', details: {} });
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((t) => t.stop());
      patchModule({ moduleId: 'camera-microphone', status: 'erfolgreich gelesen', details: { kameraVorhanden: true, mikrofonVorhanden: true, streamFreigegeben: true } });
    } catch (error) {
      patchModule({ moduleId: 'camera-microphone', status: 'nicht erlaubt', details: { streamFreigegeben: false, reason: error instanceof Error ? error.message : 'Zugriff wurde abgelehnt oder blockiert.' } });
    }
  }

  async function startMediaDevices() {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.enumerateDevices) {
      return patchModule({ moduleId: 'media-devices', status: 'browser unterstuetzt nicht', details: {} });
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      patchModule({ moduleId: 'media-devices', status: 'erfolgreich gelesen', details: { audioinput: devices.filter((d) => d.kind === 'audioinput').length, videoinput: devices.filter((d) => d.kind === 'videoinput').length, audiooutput: devices.filter((d) => d.kind === 'audiooutput').length, beispielLabel: devices.find((d) => d.label)?.label ?? 'Labels ohne Freigabe meist leer' } });
    } catch (error) {
      patchModule({ moduleId: 'media-devices', status: 'nicht erlaubt', details: { reason: error instanceof Error ? error.message : 'Keine Berechtigung für Geräteauflistung.' } });
    }
  }

  async function startFonts() {
    if (typeof window === 'undefined' || !('queryLocalFonts' in window)) {
      return patchModule({ moduleId: 'local-fonts', status: 'browser unterstuetzt nicht', details: {} });
    }

    try {
      const fonts = await (window as any).queryLocalFonts();
      patchModule({ moduleId: 'local-fonts', status: 'erfolgreich gelesen', details: { anzahl: fonts.length, beispiele: fonts.slice(0, 5).map((f: any) => f.fullName).join(', ') } });
    } catch (error) {
      patchModule({ moduleId: 'local-fonts', status: 'nicht erlaubt', details: { reason: error instanceof Error ? error.message : 'Lokaler Schriftzugriff wurde verweigert.' } });
    }
  }

  async function startWebRTC() {
    if (typeof window === 'undefined' || !window.RTCPeerConnection) {
      return patchModule({ moduleId: 'webrtc', status: 'browser unterstuetzt nicht', details: {} });
    }
    patchModule({ moduleId: 'webrtc', status: 'erfolgreich gelesen', details: { verfuegbar: true, candidateTypen: 'host, srflx, relay (theoretisch je nach Netzwerk)' } });
  }

  const permissionHints = useMemo(() => {
    const entries: Record<string, string | undefined> = {};
    for (const moduleResult of modules) {
      if (moduleResult.status === 'nicht erlaubt') {
        entries[moduleResult.moduleId] = 'Berechtigung wurde verweigert. Bitte Browser-Dialog akzeptieren oder in den Site-Einstellungen erneut erlauben.';
      }
    }
    return entries;
  }, [modules]);

  const completedModules = modules.filter((module) => module.status === 'erfolgreich gelesen').length;

  const report: ExportReportSchema = {
    exportedAt: new Date().toISOString(),
    consentMode: mode,
    serverInfo,
    browserInfo,
    urlParams,
    referrerPresent: !!referrer && referrer !== 'kein Referer',
    features,
    permissionModules: modules
  };

  return (
    <div className="space-y-6">
      <header className="app-card p-5 text-sm">
        Diese Demo zeigt nur transparent, was eine Webseite prinzipiell sehen kann. Es wird keine versteckte Identifikation und kein Tracking ueber Sitzungen hinweg durchgefuehrt.
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Was sieht eine Webseite ueber mich?</h1>
          <p className="mt-1 text-sm text-muted">Modus: {mode}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="btn-ghost">Zurueck</Link>
          <Link href="/learn" className="btn-ghost">Learn</Link>
        </div>
      </div>

      <section className="app-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Kursfortschritt</h2>
          <span className="text-sm text-muted">Module {completedModules}/5 abgeschlossen</span>
        </div>
        <div className="h-2 rounded-full bg-surface-elevated">
          <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${(completedModules / 5) * 100}%` }} />
        </div>
      </section>

      <section className="app-card p-4">
        <h2 className="text-xl font-semibold">A) Serverseitig sichtbar</h2>
        <p className="text-sm text-muted">Diese Werte kommen aus dem HTTP-Request und sind fuer Webserver/Reverse-Proxy normal sichtbar.</p>
        <pre className="mt-3 overflow-x-auto rounded bg-surface-elevated p-3 text-xs">{JSON.stringify(serverInfo, null, 2)}</pre>
      </section>

      <section className="app-card p-4">
        <h2 className="text-xl font-semibold">B) Clientseitig sichtbar</h2>
        {browserInfo ? <DataTable rows={browserInfo.fields} /> : <p>Nur nach Zustimmung fuer passive Auswertung.</p>}
      </section>

      <section className="app-card p-4">
        <h2 className="text-xl font-semibold">C) Referrer und URL-Parameter</h2>
        <p className="text-sm text-muted">URL-Parameter und Referer koennen sensible Informationen enthalten. Diese Demo speichert oder leitet sie nicht weiter.</p>
        <pre className="mt-3 rounded bg-surface-elevated p-3 text-xs">{JSON.stringify({ params: urlParams, referrer }, null, 2)}</pre>
      </section>

      <section className="space-y-3 app-card p-4">
        <h2 className="text-xl font-semibold">D) Browser-Feature-Erkennung</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard name="WebGL" supported={!!features.webgl} description="3D-Grafik API" relevance="Kann in Kombination identifizierend wirken." />
          <FeatureCard name="Canvas" supported={!!features.canvas} description="2D-Zeichenflaeche" relevance="Wird oft fuer Rendering genutzt." />
          <FeatureCard name="AudioContext" supported={!!features.audioContext} description="Audio API" relevance="Audio-Stack kann variieren." />
          <FeatureCard name="MediaDevices" supported={!!features.mediaDevices} description="Kamera/Mikrofon API" relevance="Nur mit Berechtigung sensitiv." />
          <FeatureCard name="Geolocation" supported={!!features.geolocation} description="Standort API" relevance="Hochsensitiv." />
          <FeatureCard name="Local Font Access" supported={!!features.localFontAccess} description="Lokale Schriften lesen" relevance="Font-Set kann stark identifizierend sein." />
          <FeatureCard name="Sensors API" supported={!!features.sensorsApi} description="Geraetesensoren" relevance="Sensorwerte koennen Rueckschluesse erlauben." />
          <FeatureCard name="WebRTC" supported={!!features.webRTC} description="Echtzeitkommunikation" relevance="Kann Netzwerkdetails offenbaren." />
          <FeatureCard name="Permissions API" supported={!!features.permissionsApi} description="Berechtigungsstatus" relevance="Status kann Kontext liefern." />
        </div>
      </section>

      {mode === 'extended' && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3) Erweiterte Module (nur mit separater Zustimmung)</h2>
          <PermissionModule title="Modul 1: Geolocation Demo" warning="Standort ist hochsensitiv. Nur nach expliziter Freigabe." onStart={startGeo} statusHint={permissionHints['geolocation']}><pre className="text-xs">{JSON.stringify(modules.find((m) => m.moduleId === 'geolocation'), null, 2)}</pre></PermissionModule>
          <PermissionModule title="Modul 2: Kamera/Mikrofon Demo" warning="Keine Aufzeichnung, kein Upload, nur lokale Abfrage." onStart={startCamMic} statusHint={permissionHints['camera-microphone']}><pre className="text-xs">{JSON.stringify(modules.find((m) => m.moduleId === 'camera-microphone'), null, 2)}</pre></PermissionModule>
          <PermissionModule title="Modul 3: MediaDevices Demo" warning="Zeigt nur Anzahl/Typen, keine persistente deviceId-Nutzung." onStart={startMediaDevices} statusHint={permissionHints['media-devices']}><pre className="text-xs">{JSON.stringify(modules.find((m) => m.moduleId === 'media-devices'), null, 2)}</pre></PermissionModule>
          <PermissionModule title="Modul 4: Local Font Access Demo" warning="Fonts koennen identifizierend sein; hier nur Anzahl + Beispiele lokal." onStart={startFonts} statusHint={permissionHints['local-fonts']}><pre className="text-xs">{JSON.stringify(modules.find((m) => m.moduleId === 'local-fonts'), null, 2)}</pre></PermissionModule>
          <PermissionModule title="Modul 5: WebRTC Transparency Demo" warning="Nur defensiv-minimale Transparenz ohne aggressive ICE-Sammlung." onStart={startWebRTC} statusHint={permissionHints.webrtc}><pre className="text-xs">{JSON.stringify(modules.find((m) => m.moduleId === 'webrtc'), null, 2)}</pre></PermissionModule>
        </section>
      )}

      <section className="app-card p-4">
        <h2 className="text-xl font-semibold">4) Was wir bewusst NICHT tun</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>kein Canvas/Audio/WebGL-Fingerprint</li><li>kein Font-Fingerprint zur Wiedererkennung</li><li>kein Cookie-Tracking, kein localStorage-Identifier</li><li>keine Third-Party-Skripte, kein Session Replay</li><li>kein Cross-Site-Tracking, kein CNAME-Cloaking, kein Bounce Tracking</li><li>kein ETag-Missbrauch, keine Wiedererkennung ueber mehrere Besuche</li>
        </ul>
      </section>

      <section className="space-y-3 app-card p-4">
        <h2 className="text-xl font-semibold">5) Technische Erklaerungen</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{explainCards.map((item) => <InfoCard key={item.name} item={item} />)}</div>
      </section>

      <ExportReportButton report={report} />
    </div>
  );
}
