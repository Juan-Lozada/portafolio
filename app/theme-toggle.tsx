'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import { useLocale } from './locale-provider';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const { copy } = useLocale();
  const [theme, setTheme] = useState<Theme>('light');

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={theme === 'light' ? copy('Activar tema oscuro', 'Enable dark theme') : copy('Activar tema claro', 'Enable light theme')}
      aria-pressed={theme === 'dark'}
      onClick={toggleTheme}
    >
      <MorphIcon icon={theme === 'light' ? Sun : Moon} size={18} strokeWidth={1.8} spring="smooth" />
    </button>
  );
}
