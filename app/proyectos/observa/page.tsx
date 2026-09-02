import type { Metadata } from 'next';
import ObservaDashboard from './observa-dashboard';

export const metadata: Metadata = {
  title: 'Observa | Visualización y monitoreo de datos',
  description:
    'Proyecto demostrativo de Juan Lozada para explorar indicadores, estaciones y alertas operacionales.',
  openGraph: {
    title: 'Observa | Visualización y monitoreo de datos',
    description: 'Una demostración ficticia de producto orientado a datos y decisiones.',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Observa | Visualización y monitoreo de datos',
    description: 'Una demostración ficticia de producto orientado a datos y decisiones.',
    images: [],
  },
};

export default function ObservaPage() {
  return <ObservaDashboard />;
}
