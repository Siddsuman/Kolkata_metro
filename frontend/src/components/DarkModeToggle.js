import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'metro_theme';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial = saved ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Back-compat: old values were 'light'/'dark'
    const normalized = initial === 'light' || initial === 'dark' ? initial : 'system';
    const start = normalized === 'system' ? 'system' : normalized;
    setTheme(start);

    const apply = () => {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const effective = start === 'system' ? (prefersDark ? 'dark' : 'light') : start;
      document.documentElement.classList.toggle('dark', effective === 'dark');
    };

    apply();

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;

    const onChange = () => {
      if (start !== 'system') return;
      const prefersDark = mq.matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    };

    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const cycle = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective = next === 'system' ? (prefersDark ? 'dark' : 'light') : next;
    document.documentElement.classList.toggle('dark', effective === 'dark');

    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/30 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:mint-glow transition"
      aria-label="Toggle theme"
    >
      <span className="text-base">{theme === 'dark' ? '🌙' : theme === 'system' ? '🖥️' : '☀️'}</span>
      <span className="uppercase tracking-wide text-xs">{theme === 'dark' ? 'Dark' : theme === 'system' ? 'System' : 'Light'}</span>
    </button>
  );
}



