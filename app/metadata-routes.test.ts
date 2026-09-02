import { afterEach, describe, expect, it } from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('rutas de descubrimiento', () => {
  const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (previousSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
  });

  it('genera sitemap sin barras duplicadas', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://juan-lozada.github.io/portafolio/';
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://juan-lozada.github.io/portafolio',
      'https://juan-lozada.github.io/portafolio/proyectos/observa',
      'https://juan-lozada.github.io/portafolio/proyectos/ruta',
      'https://juan-lozada.github.io/portafolio/proyectos/mesa',
    ]);
  });

  it('publica la ubicación canónica del sitemap', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://juan-lozada.github.io/portafolio/';
    expect(robots().sitemap).toBe('https://juan-lozada.github.io/portafolio/sitemap.xml');
  });
});
