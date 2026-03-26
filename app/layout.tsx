import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Consent-based Browser Transparency Demo',
  description: 'Transparente Demo, welche Browserdaten technisch sichtbar sind.'
};

const themeScript = `(function(){try{const saved=localStorage.getItem('theme');const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;const useDark=saved?saved==='dark':prefersDark;document.documentElement.classList.toggle('dark',useDark);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeToggle />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-4 md:p-8">
          <header className="app-card mb-6 flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Cybersecurity Modul</p>
              <h1 className="text-lg font-semibold">Browser Transparency Demo</h1>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link href="/" className="btn-ghost">Start</Link>
              <Link href="/dashboard" className="btn-ghost">Dashboard</Link>
              <Link href="/learn" className="btn-ghost">Awareness</Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-6 border-t border-border/40 pt-4 text-sm text-muted">
            Nur auf localhost/server ausführen – bitte nicht via file:// öffnen.
          </footer>
        </div>
      </body>
    </html>
  );
}
