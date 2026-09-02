import type { Metadata, Viewport } from 'next';
import './globals.css';
import LocaleProvider from './locale-provider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const canonicalUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
const ogImageUrl = new URL('og.png', canonicalUrl).toString();
const faviconUrl = new URL('favicon.svg', canonicalUrl).toString();

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Juan Lozada',
  jobTitle: 'Front-End Developer',
  url: canonicalUrl,
  sameAs: [
    'https://www.linkedin.com/in/juanlozadao/',
    'https://github.com/Juan-Lozada',
  ],
  knowsAbout: ['React', 'TypeScript', 'Next.js', 'Data visualization', 'Responsive web design', 'Web accessibility'],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Juan Lozada | Front-End Developer',
  description:
    'Portafolio de Juan Lozada, desarrollador Front-End especializado en React, productos operacionales y visualización de datos.',
  applicationName: 'Portafolio de Juan Lozada',
  authors: [{ name: 'Juan Lozada', url: 'https://www.linkedin.com/in/juanlozadao/' }],
  keywords: ['Juan Lozada', 'Front-End Developer', 'React', 'TypeScript', 'Next.js', 'visualización de datos'],
  alternates: { canonical: canonicalUrl },
  robots: { index: true, follow: true },
  icons: { icon: faviconUrl },
  openGraph: {
    type: 'website',
    locale: 'es_419',
    url: canonicalUrl,
    siteName: 'Juan Lozada — Front-End Developer',
    title: 'Juan Lozada | Front-End Developer',
    description: 'React, productos operacionales y visualización de datos.',
    images: [{ url: ogImageUrl, width: 1732, height: 909, alt: 'Juan Lozada — Front-End Developer, React, datos y operaciones' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Lozada | Front-End Developer',
    description: 'React, productos operacionales y visualización de datos.',
    images: [ogImageUrl],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5faf6' },
    { media: '(prefers-color-scheme: dark)', color: '#071c20' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-419">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, '\\u003c') }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
