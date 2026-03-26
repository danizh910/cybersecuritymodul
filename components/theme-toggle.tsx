'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  function toggle() {
    if (typeof window === 'undefined') return;
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <button onClick={toggle} className="fixed right-4 top-4 rounded-md border border-white/20 bg-card px-3 py-2 text-xs">
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
