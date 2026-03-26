'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasDark = document.documentElement.classList.contains('dark');
    setDark(hasDark);
  }, []);

  function toggle() {
    if (typeof window === 'undefined') return;
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      className="fixed right-4 top-4 z-50 rounded-lg border border-border/50 bg-card/90 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur"
      aria-label="Theme wechseln"
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
