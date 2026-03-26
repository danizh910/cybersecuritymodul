import './globals.css';
import type { Metadata } from 'next';
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
        <main className="mx-auto min-h-screen w-full max-w-7xl p-4 md:p-8">{children}</main>
      </body>
    </html>
  );
}
