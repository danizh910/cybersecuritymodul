'use client';

import Link from 'next/link';

const topics = [
  ['Cookies', 'Kleine Browserdaten fuer Sitzungen; koennen auch fuer Tracking missbraucht werden.'],
  ['Browser Fingerprinting', 'Kombination technischer Merkmale kann Wiedererkennung ermoeglichen.'],
  ['Client Hints', 'HTTP-Header mit Geraetehinweisen fuer Optimierung und potenziell Profilbildung.'],
  ['Referrer', 'Kann Herkunftsseite und Parameter preisgeben.'],
  ['Geolocation', 'Praeziser Standort nur nach Einwilligung.'],
  ['Kamera/Mikrofon Permissions', 'Nur mit klarer Freigabe nutzbar, sehr sensitiv.'],
  ['Storage', 'localStorage/IndexedDB koennen IDs speichern; diese Demo nutzt das bewusst nicht.'],
  ['Datenminimierung', 'Nur noetige Daten erheben und moeglichst kurz verarbeiten.'],
  ['Einwilligung ist nicht alles', 'Auch mit Consent muss Verarbeitung verhaeltnismaessig und zweckgebunden sein.'],
  ['Transparenz', 'Nutzer sollen verstehen, welche Daten technisch sichtbar sind und warum.']
];

export default function LearnPage() {
  return (
    <div className="space-y-4">
      <section className="app-card p-5">
        <h1 className="text-3xl font-bold">Datenschutz- & Awareness-Seite</h1>
        <p className="mt-2 text-muted">Verstaendliche Grundlagen zu Browserdaten, Consent und Privacy-by-Design.</p>
      </section>
      <div className="grid gap-3 md:grid-cols-2">
        {topics.map(([title, body]) => (
          <article key={title} className="app-card p-4">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm text-muted">{body}</p>
          </article>
        ))}
      </div>
      <Link href="/" className="btn-ghost">Zur Startseite</Link>
    </div>
  );
}
