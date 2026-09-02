'use client';

import { Languages } from 'lucide';
import { MorphIcon } from 'morphicons/react';
import { useLocale } from './locale-provider';

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, copy } = useLocale();
  const next = locale === 'es-LA' ? 'en' : 'es-LA';

  return (
    <button
      className={compact ? 'language-toggle language-toggle-compact' : 'language-toggle'}
      type="button"
      onClick={() => setLocale(next)}
      aria-label={copy('Cambiar el idioma a inglés', 'Switch language to Spanish')}
      title={copy('Cambiar a inglés', 'Switch to Spanish')}
    >
      <MorphIcon icon={Languages} size={16} strokeWidth={1.8} />
      <span>{locale === 'es-LA' ? 'EN' : 'ES'}</span>
    </button>
  );
}
