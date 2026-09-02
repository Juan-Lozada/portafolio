'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';

export type Locale = 'es-LA' | 'en';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: <T>(spanish: T, english: T) => T;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = 'jl-portfolio-locale';
const localeEvent = 'jl-locale-change';

function getLocaleSnapshot(): Locale {
  const saved = window.localStorage.getItem(storageKey);
  return saved === 'en' ? 'en' : 'es-LA';
}

function subscribeToLocale(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(localeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(localeEvent, callback);
  };
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribeToLocale, getLocaleSnapshot, () => 'es-LA');

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'es-419';
  }, [locale]);

  function setLocale(nextLocale: Locale) {
    window.localStorage.setItem(storageKey, nextLocale);
    window.dispatchEvent(new Event(localeEvent));
  }

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    setLocale,
    copy: <T,>(spanish: T, english: T) => locale === 'en' ? english : spanish,
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale debe utilizarse dentro de LocaleProvider.');
  return context;
}
