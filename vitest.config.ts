import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/site-paths.ts', 'app/locale-provider.tsx', 'app/sitemap.ts', 'app/robots.ts'],
    },
  },
});
