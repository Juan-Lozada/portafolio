import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import LocaleProvider, { useLocale } from './locale-provider';

function LocaleProbe() {
  const { locale, setLocale, copy } = useLocale();
  return (
    <div>
      <output>{locale}</output>
      <p>{copy('Contenido en español', 'English content')}</p>
      <button type="button" onClick={() => setLocale('en')}>English</button>
    </div>
  );
}

describe('LocaleProvider', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('inicia en español latinoamericano', () => {
    render(<LocaleProvider><LocaleProbe /></LocaleProvider>);
    expect(screen.getByText('es-LA')).toBeInTheDocument();
    expect(screen.getByText('Contenido en español')).toBeInTheDocument();
  });

  it('persiste inglés y actualiza el idioma del documento', () => {
    render(<LocaleProvider><LocaleProbe /></LocaleProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    expect(screen.getByText('en')).toBeInTheDocument();
    expect(screen.getByText('English content')).toBeInTheDocument();
    expect(window.localStorage.getItem('jl-portfolio-locale')).toBe('en');
    expect(document.documentElement).toHaveAttribute('lang', 'en');
  });
});
