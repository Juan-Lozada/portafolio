import type { Metadata } from 'next';
import ProjectComingSoon from '../project-coming-soon';

export const metadata: Metadata = {
  title: 'Ruta | En construcción',
  description: 'Una futura demostración de gestión de flota. Pronto disponible para probar.',
  alternates: { canonical: `${(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')}/proyectos/ruta/` },
  openGraph: { title: 'Ruta | En construcción', description: 'Operación de flota. Demostración en desarrollo.', images: [] },
  twitter: { card: 'summary', title: 'Ruta | En construcción', description: 'Operación de flota. Demostración en desarrollo.', images: [] },
};

export default function RutaPage() {
  return <ProjectComingSoon projectId="ruta" />;
}
