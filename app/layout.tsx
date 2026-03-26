import './globals.css';
import type { Metadata } from 'next';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Consent-based Browser Transparency Demo',
  description: 'Transparente Demo, welche Browserdaten technisch sichtbar sind.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <ThemeToggle />
        <main className="mx-auto min-h-screen max-w-7xl p-4 md:p-8">{children}</main>
      </body>
    </html>
  );
}
