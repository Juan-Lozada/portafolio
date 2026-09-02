import type { Metadata } from 'next';
import ProjectComingSoon from '../project-coming-soon';

export const metadata: Metadata = {
  title: 'Mesa | En construcción',
  description: 'Una futura demostración de pagos con QR. Pronto disponible para probar.',
  alternates: { canonical: `${(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')}/proyectos/mesa/` },
  openGraph: { title: 'Mesa | En construcción', description: 'Pagos con QR. Demostración en desarrollo.', images: [] },
  twitter: { card: 'summary', title: 'Mesa | En construcción', description: 'Pagos con QR. Demostración en desarrollo.', images: [] },
};

export default function MesaPage() {
  return <ProjectComingSoon projectId="mesa" />;
}
